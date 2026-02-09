"use server";

import { promises } from "fs";
import mammoth from "mammoth";
import * as natural from "natural";
import path from "path";
import PDFParser from "pdf2json";
import { createWorker } from "tesseract.js";
import { fileURLToPath } from "url";

// Define interfaces for affidavit structure
interface Affiant {
  name: string;
  address: string;
}

interface Statement {
  text: string;
}

interface Notary {
  name: string;
  date: string;
  commission: string;
}

interface Metadata {
  title: string;
  date: string;
  jurisdiction: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize NLP tools
// Provide an empty abbreviations list to SentenceTokenizer to satisfy type requirements
const tokenizer = new natural.SentenceTokenizer([]);
// const wordTokenizer = new natural.WordTokenizer();

// Function to extract text from input file
async function extractText(filePath: string, file: File): Promise<string> {
  const ext = filePath.split(".").pop()?.toLowerCase();
  console.log({ ext });
  if (ext === "pdf") {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
      pdfParser.loadPDF(filePath);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfParser.on("pdfParser_dataReady", async (pdfData: any) => {
        let extractedText = "";
        let hasAnyText = false;

        for (const page of pdfData.Pages) {
          let pageText = "";

          if (page.Texts && page.Texts.length > 0) {
            for (const textRun of page.Texts) {
              for (const r of textRun.R) {
                pageText += decodeURIComponent(r.T) + " ";
              }
            }
          }

          if (pageText.trim().length > 0) {
            hasAnyText = true;
            extractedText += pageText;
          }
        }

        // 🔍 PDF TYPE CHECK
        if (!hasAnyText) {
          console.log("📄 Detected IMAGE-BASED PDF (scanned)");
          resolve("");
        } else {
          console.log("📄 Detected TEXT-BASED PDF");
          resolve(extractedText.trim());
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfParser.on("error" as any, (err: Error) => reject(err));
    });
  } else if (ext === "png" || ext === "jpeg" || ext === "jpg") {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(
      path.join(
        __dirname,
        "../../node_modules/tesseract.js/src/worker-script/node/index.js",
      ),
    );
    const worker = await createWorker("eng", 1, {
      workerPath: path.join(
        __dirname,
        "../../node_modules/tesseract.js/src/worker-script/node/index.js",
      ),
      corePath: path.join(
        __dirname,
        "../../node_modules/tesseract.js/src/index.js",
      ),
      langPath: path.join(__dirname, "../../tessdata"), // Local path to language data
    });

    const {
      data: { text },
    } = await worker.recognize(buffer);

    // Terminate the worker to free resources
    await worker.terminate();

    return text;
  } else if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else if (ext === "txt" || ext === "rtf") {
    return await promises.readFile(filePath, "utf-8");
  } else {
    throw new Error("Unsupported file format");
  }
}

// Main function to process the affidavit
export async function convertAffidavitToXML(
  inputFile: string,
  file: File,
): Promise<string> {
  try {
    // Step 1: Extract text from the input file
    const text = await extractText(inputFile, file);
    console.log("Text extracted successfully.", { text });
    return text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.error("Error while converting: ", error);
    return "";
  }
}
