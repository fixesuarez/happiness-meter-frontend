import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/index";
import { User } from "@/models/user";

interface UserState {
  currentUser: User | null;
}
const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUser } = userSlice.actions;

export const currentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
