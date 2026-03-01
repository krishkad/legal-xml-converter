import Tesseract from "tesseract.js";


 export const extractTextClientSide = async (file: File) => {
    const { data } = await Tesseract.recognize(
      file,
      "eng",
      {
        logger: m => console.log(m)
      }
    )
    console.log({text: data.text});
  }