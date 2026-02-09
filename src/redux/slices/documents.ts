import { Document } from "@/generated/prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentsState {
  documents: Document[];
}

const initialState: DocumentsState = {
  documents: [],
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    initialDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    add_document: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    remove_document: (state, action: PayloadAction<string>) => {
      const updated_docs = state.documents.filter(
        (doc) => doc.id !== action.payload
      );
      state.documents = updated_docs;
    },
  },
});


export const {add_document, initialDocuments, remove_document} = documentsSlice.actions;
export default documentsSlice.reducer;