import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { extractTextClientSide } from "./tesseract";

// Function to extract text from input file
async function extractText(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  console.log({ ext });
  if (ext === "pdf") {
    return new Promise(async (resolve, reject) => {
      const arrayBuffer = await file.arrayBuffer();
      const pdfParser = new PDFParser();
      pdfParser.parseBuffer(Buffer.from(arrayBuffer));

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
