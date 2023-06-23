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
    reducers: {
        login: (state, action) => {
            state.token = action.payload
        }
    }
});

export const login = authSlice.actions.login;

export default authSlice.reducer;