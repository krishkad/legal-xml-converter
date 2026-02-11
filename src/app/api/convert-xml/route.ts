import { convertAffidavitToXML } from "@/actions/convert-xml";
import prisma from "@/lib/prisma";
import fs, { promises, writeFileSync } from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

export interface CustomJWTPayload extends JwtPayload {
  id: string;
  email: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(
      `${process.env.COOKIE_NAME as string}`,
    )?.value;
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    if (!token) {
      return new Response("to token found", { status: 400 });
    }

    const token_data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as CustomJWTPayload;

    if (!token_data) {
      return new Response("token expired", { status: 400 });
    }

    const subs = await prisma.subscription.findFirst({
      where: { status: "ACTIVE", userId: token_data.id },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!subs) {
      return new Response("no active subscription", { status: 400 });
    }

    console.log({ subs });

    if (
      subs?.endDate < new Date() ||
      subs.conversions_done >= subs.maxConversions
    ) {
      const expired_sub = await prisma.subscription.update({
        where: { id: subs.id },
        data: { status: "EXPIRED" },
      });

      if (!expired_sub) {
        return new Response("failed to expire subscription", { status: 400 });
      }
      return new Response("subscription expired", { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir =
      process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "public", "uploads")
        : "/tmp";
    const filePath = path.join(uploadDir, file.name);

    writeFileSync(filePath, buffer);

    const inputFile = path.join(uploadDir, file.name); // Replace with your file
    const text = await convertAffidavitToXML(inputFile, file);

    console.log([text]);

    const prompt = `You are a legal AI expert specialized in structuring legal documents into XML formats accepted by most judicial systems in the US and Europe. Your task is to take raw legal text (extracted from scanned documents using OCR) and convert it into a valid XML document following the Akoma Ntoso / LegalDocML standard.

Requirements:
Use the <akomaNtoso> root element.

Identify and correctly wrap content such as title, metadata, preamble, body, articles, sections, clauses, and annexes using the appropriate XML tags (e.g., <judgment>, <agreement>, <docTitle>, <preamble>, <body>, <article>, <paragraph>, etc.).

Generate appropriate metadata inside the <meta> tag, including:

country (e.g., "USA", "Germany")

jurisdiction (e.g., "Federal Court", "Berlin Civil Court")

language (e.g., "en", "de")

documentType (e.g., "agreement", "judgment", "pleading")

date (from text if mentioned, else leave blank)

author or parties (if names are identifiable)

Add machine-readable identifiers (eId, wId) for each section or article.

Ensure XML output is well-formed, UTF-8 encoded, and ready for use in e-filing or court archiving systems.

Input:
A block of unstructured legal text extracted from a scanned document.

Output:
A complete Legal XML document conforming to Akoma Ntoso / LegalDocML standards, formatted and indented for readability.

 Input: ${[text]}

1. Purpose: The parties agree to protect confidential information...
2. Obligations: The Receiving Party agrees not to disclose any information...
Output Format:
xml
Copy
Edit
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso>
  <agreement>
    <meta>
      <identification source="#court">
        <FRBRWork>
          <FRBRcountry value="USA"/>
          <FRBRjurisdiction value="FederalCourt"/>
          <FRBRdate date="2024-07-15"/>
          <FRBRlanguage language="en"/>
          <FRBRauthor href="#JohnDoe"/>
          <FRBRauthor href="#JaneSmith"/>
          <FRBRthis value="/agreement/nda/2024-07-15"/>
        </FRBRWork>
      </identification>
    </meta>
    <preface>
      <docTitle>Non-Disclosure Agreement (NDA)</docTitle>
    </preface>
    <body>
      <article eId="art1">
        <heading>1. Purpose</heading>
        <paragraph>The parties agree to protect confidential information...</paragraph>
      </article>
      <article eId="art2">
        <heading>2. Obligations</heading>
        <paragraph>The Receiving Party agrees not to disclose any information...</paragraph>
      </article>
    </body>
  </agreement>
</akomaNtoso>
⚠️ Important: If any section is missing, use a placeholder like <article eId="artX"><paragraph>[Text not clearly extracted]</paragraph></article>. Do not skip structure. Strictly only return xml only. their should be no text outside the <?xml /> and <akomaNtoso tags. only return xml dont add anything else before xml and after xml. strickly only return xml only`;

    const response = await openai.chat.completions.create({
      // model: "mistralai/mistral-nemo:free", // You can also try "deepseek/deepseek-coder"
      model: "nvidia/nemotron-nano-12b-v2-vl:free",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
      temperature: 0.7,
    });

    if (
      !response.choices[0].message?.content ||
      !response.choices ||
      !response.id ||
      !response
    ) {
      return new Response("failed to convert document.", { status: 400 });
    }

    const finalXml = response.choices[0].message.content
      .replace(/^```(?:json|xml)?\s*/i, "")
      .replace(/```$/, "");
    console.log({ xml: finalXml });

    const outputFile = path.join(uploadDir, `${file.name.split(".")[0]}.xml`);
    await promises.writeFile(outputFile, finalXml ?? "");

    const doc = await prisma.document.create({
      data: {
        userId: token_data.id,
        name: file.name,
        size: file.size.toString(),
        status: "success",
      },
    });

    if (!doc) {
      return new Response("failed to convert document.", { status: 400 });
    }

    await prisma.subscription.update({
      where: { userId: token_data.id, id: subs.id },
      data: { conversions_done: subs.conversions_done + 1 },
    });

    let xmlString = fs.readFileSync(outputFile, "utf8");

    xmlString = xmlString.replace(/\u202F/g, " ");

    xmlString = xmlString.replace(/[^\x00-\xFF]/g, "");

    const safeBuffer = Buffer.from(xmlString, "utf8");

    return new Response(safeBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="${
          file.name.split(".")[0]
        }.xml`,
        "X-Doc": JSON.stringify(doc),
      },
    });
  } catch (error) {
    console.log("[ERROR WHILE CONVERTING TO XML]: ", error);
    return new Response("Internal server error", { status: 500 });
  }
}
