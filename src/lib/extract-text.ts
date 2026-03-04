import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import { extractTextClientSide } from "./tesseract";

// Function to extract text from input file
async function extractText(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  console.log({ ext });
  if (ext === "pdf") {
    return new Promise(async (resolve, reject) => {
      const pdf = await pdfjsLib.getDocument({
        data: await file.arrayBuffer(),
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }

      resolve(text);
    });
  } else if (ext === "png" || ext === "jpeg" || ext === "jpg") {
    const text = await extractTextClientSide(file);

    return text;
  } else if (ext === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (ext === "txt" || ext === "rtf") {
    return await file.text();
  } else {
    throw new Error("Unsupported file format");
  }
}

// Main function to process the affidavit
export async function extract_text(file: File): Promise<string> {
  try {
    // Step 1: Extract text from the input file
    const text = await extractText(file);
    return text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.error("Error while converting: ", error);
    return "";
  }
}
