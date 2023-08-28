import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  resetCart,
  updateCart,
  userCart,
} from "./CartApi";

const initialState = {
  items: [],
  status: "idle",
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (item) => {
    const response = await addToCart(item);

    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (updatedCart) => {
    const response = await updateCart(updatedCart);

    return response.data;
  }
);

export const addToCartByUserAsync = createAsyncThunk(
  "cart/findCartByIdFetch",
  async () => {
    const response = await userCart();

    return response.data;
  }
);

export const deleteFromCartAsync = createAsyncThunk(
  "cart/DeleteFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);

    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  //userid
  const response = await resetCart();

  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(addToCartByUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items[index] = action.payload;
      })
      .addCase(deleteFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
