import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config";

export const fetchProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${config.domain}/products`);
        return response.data
    }
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});