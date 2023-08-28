import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchallOrders, updateOrder } from "./OrderApi";
import { cartSlice } from "../../../Cart/CartSlice";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);

    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);

    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pagination, sort }) => {
    const response = await fetchallOrders(pagination, sort);

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    orderReset: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { orderReset } = orderSlice.actions;

export const selectorders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
