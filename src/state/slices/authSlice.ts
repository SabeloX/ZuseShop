import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../middleware/login";

type AuthReducerType = {
    loading: boolean;
    error: null | string;
    token: string | null;
}

const initialAuthState: AuthReducerType = {
    loading: false,
    error: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default authSlice.reducer;