import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    loading: false,
    error: null,
    success: false,
    token: null,
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {}
});

export default authSlice.reducer;