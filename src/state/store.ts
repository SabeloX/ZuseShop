import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    }
})

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;