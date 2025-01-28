import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserData {
  birthDate: number;
}

const initialState = null as IUserData | null;

const themeSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setBirthDate(state, action: PayloadAction<number>) {
      return { ...state, birthDate: action.payload };
    },
    clearUserData() {
      return null;
    },
  },
});

export const { setBirthDate, clearUserData } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
