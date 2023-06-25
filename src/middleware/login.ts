import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config";

export const login = createAsyncThunk(
    "auth/login",
    async (data: { username: string; password: string }, { rejectWithValue }
) => {
    try {
        const response = await axios.post(`${config.domain}/auth/login`, data);
        return response.data.token;
    }
    catch (error: any) {
        console.log(error)
        return rejectWithValue(
            error.message === "Request failed with status code 401" ?
                "Please enter the corrent credentials." :
                "Something went wrong, please check your internet connection and try again."
        );
    }
});