import { User } from "@/generated/prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: Partial<User>;
}

const initialState: UserState = {
  user: {} as Partial<User>,
};

export const user_slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize_user: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
    },
  },
});

export const { initialize_user } = user_slice.actions;
export default user_slice.reducer;
