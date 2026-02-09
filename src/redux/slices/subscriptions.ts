import { Subscription } from "@/generated/prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  subscriptions: Subscription[];
}

const initialState: SubscriptionState = {
  subscriptions: [],
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    initialSubscription: (state, action: PayloadAction<Subscription[]>) => {
      state.subscriptions = action.payload;
    },
  },
});

export const { initialSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
