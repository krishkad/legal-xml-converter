// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import SubscriptionsSlice from "./slices/subscriptions";
import DocumentsSlice from "./slices/documents";
import UserSlice from "./slices/user";
// import userReducer from './slices/userSlice'; // Example slice

export const makeStore = () =>
  configureStore({
    reducer: {
      subscriptions: SubscriptionsSlice,
      documents: DocumentsSlice,
      user: UserSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
