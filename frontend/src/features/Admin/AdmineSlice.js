import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilter,
  fetchAllBrands,
  fetchAllCategory,
  fetchProductById,
} from "./ProductApi";

const initialState = {
  products: [],
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProdduct: null,
  status: "idle",
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);

    return response.data;
  }
);

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (id) => {
    const response = await fetchAllProducts();

    return response.data;
  }
);

export const fetchAllBrand = createAsyncThunk(
  "product/fetchAllBrand",
  async () => {
    const response = await fetchAllBrands();

    return response.data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "product/fetchAllCategory",
  async () => {
    const response = await fetchAllCategory();

    return response.data;
  }
);

export const fetchAllProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);

    return response.data;
  }
);

export const ProductListSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.totalItems;
      })

      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      .addCase(fetchAllBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrand.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })

      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProdduct = action.payload;
      });
  },
});

export const { increment } = ProductListSlice.actions;

export const selectAllProduct = (state) => state.product.products;
export const setTootalItems = (state) => state.product.totalItems;
export const setCatogries = (state) => state.product.categories;
export const setBrands = (state) => state.product.brands;
export const setSelectedProduct = (state) => state.product.selectedProdduct;

export default ProductListSlice.reducer;
