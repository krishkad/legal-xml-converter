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
    updateCount: (state, action: PayloadAction<string>) => {
      const sub = state.subscriptions.find((s) => s.id === action.payload);

      if (sub) {
        sub.conversions_done += 1;
      }
    },
  },
});

export const { initialSubscription, updateCount } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
