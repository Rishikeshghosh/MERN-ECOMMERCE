import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilter,
  fetchAllBrands,
  fetchAllCategory,
  fetchProductById,
  createProduct,
  updateProduct,
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
  async () => {
    const response = await fetchAllProducts();

    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);

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
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilter(
      filter,
      sort,
      pagination,
      admin
    );

    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);

    return response.data;
  }
);

export const ProductListSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProdduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.totalItems = action.payload.totalItems;
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
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = ProductListSlice.actions;

export const selectAllProduct = (state) => state.product.products;
export const setTootalItems = (state) => state.product.totalItems;
export const setCatogries = (state) => state.product.categories;
export const setBrands = (state) => state.product.brands;
export const setSelectedProduct = (state) => state.product.selectedProdduct;
export const setSelectProductListStatus = (state) => state.product.status;

export default ProductListSlice.reducer;
