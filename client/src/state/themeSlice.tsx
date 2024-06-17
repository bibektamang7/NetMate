import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    mode: string;
}
const initialState: ThemeState = {
    mode: "dark",
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;