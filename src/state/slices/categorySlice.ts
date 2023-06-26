import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoies } from "../../middleware/fetchCategories";

type CategoryReducerType = {
    loadingCategories: boolean;
    categories: string[];
    category: string;
    categoryError: null | string;
}

const initialCategoryState: CategoryReducerType = {
    loadingCategories: false,
    categoryError: null,
    categories: [],
    category: "all",
}

const categorySlice = createSlice({
    name: "categories",
    initialState: initialCategoryState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoies.pending, (state) => {
                state.loadingCategories = true;
                state.categoryError = null;
            })
            .addCase(fetchCategoies.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categoryError = null;
                state.categories = action.payload;
            })
            .addCase(fetchCategoies.rejected, (state, action) => {
                state.loadingCategories = false;
                state.categoryError = action.payload as string;
            })
    }
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;