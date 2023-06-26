import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../middleware/fetchProducts";
import { ProductType } from "../../components/products/Product";
import { fetchCategoies } from "../../middleware/fetchCategories";

type ProductReducerType = {
    loadingCategories: boolean;
    loadingProducts: boolean;
    products: ProductType[];
    categories: string[];
    category: string;
    product: ProductType | null;
    categoryError: null | string;
    productError: null | string;
}

const initialProductsState: ProductReducerType = {
    loadingCategories: false,
    loadingProducts: false,
    categoryError: null,
    productError: null,
    categories: [],
    products: [],
    category: "all",
    product: null
}

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        addNewProduct: (state, action) => {
            state.products.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingProducts = true;
                state.productError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loadingProducts = false;
                state.productError = null;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loadingProducts = false;
                state.productError = action.payload as string;
            })
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

export const { setCategory, setProduct, addNewProduct } = productsSlice.actions;

export default productsSlice.reducer;