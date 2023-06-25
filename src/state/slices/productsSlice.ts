import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    loading: false,
    error: null,
    categories: [],
    products: [],
    category: ""
}

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload;
        },
        getProducts: (state, action) => {
            state.products = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload
        }
    },
});

export const { getCategories, getProducts, setCategory } = productsSlice.actions;

export default productsSlice.reducer;