import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config";

export const fetchCategoies = createAsyncThunk("products/getCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${config.domain}/products/categories`);
        return response.data
    }
    catch (error: any) {
        return rejectWithValue(error.message);
    }
});