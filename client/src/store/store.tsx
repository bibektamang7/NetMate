import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice";
import themeReducer from "../state/themeSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    },
});
// Optionally export RootState and AppDispatch types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;