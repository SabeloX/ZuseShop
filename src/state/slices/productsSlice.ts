import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../middleware/fetchProducts";
import { ProductType } from "../../components/products/Product";
import { fetchCategoies } from "../../middleware/fetchCategories";

type ProductReducerType = {
    loadingCategories: boolean;
    loadingProducts: boolean;
    error: string | null;
    products: ProductType[];
    categories: string[];
    category: string;
}

const initialProductsState: ProductReducerType = {
    loadingCategories: false,
    loadingProducts: false,
    error: null,
    categories: [],
    products: [],
    category: "all"
}

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingProducts = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loadingProducts = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCategoies.pending, (state) => {
                state.loadingCategories = true;
                state.error = null;
            })
            .addCase(fetchCategoies.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.error = null;
                state.categories = action.payload;
            })
            .addCase(fetchCategoies.rejected, (state, action) => {
                state.loadingCategories = false;
                state.error = action.payload as string;
            })
    }
});

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;