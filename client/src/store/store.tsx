import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authSlice";
import themeReducer from "../state/themeSlice";
import { userApi } from "../config/Api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(userApi.middleware),
});
// Optionally export RootState and AppDispatch types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;