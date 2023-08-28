import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/ProductSlice";
import authReducer from "../features/Auth/Components/AuthSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from "../features/Auth/Components/Order/OrderSlice";
import userReducer from "../features/User/UserSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
