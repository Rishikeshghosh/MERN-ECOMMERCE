import React, { useEffect } from "react";
/* import { ProductList } from "./features/counter/ProductList";
 */
import Home from "./pages/Home";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Protected from "./features/Auth/Components/Protected";
import { addToCartByUserAsync } from "./features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/Auth/Components/AuthSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccesPage from "./pages/OrderSuccesPage";

import UserOrderPage from "./pages/UserOrderpage";
import UserProfile from "./features/User/Components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrdersAsync,
} from "./features/User/UserSlice";
import SignOut from "./features/Auth/Components/LogOut";
import LogOut from "./features/Auth/Components/LogOut";
import ForgotPasswoedPage from "./pages/ForgotPasswoedPage";
import ProtectedAdmin from "./features/Auth/Components/ProtectedAdmin";
import AdminHomePage from "./pages/AdmineHomePage";
import AdminProductDetail from "./features/Admin/Components/AdminProductdetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { checkAuth } from "./features/Auth/Components/AuthApi";
import Navbar from "./features/Navbar.js/Navbar";
import StripeCheckoutPage from "./pages/StripeCheckOutPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage></AdminHomePage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productDetail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetail></AdminProductDetail>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/Login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/SignUp",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },

  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },

  {
    path: "/productDetail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckoutPage></StripeCheckoutPage>
      </Protected>
    ),
  },

  {
    path: "/orderSuccesPage/:id",
    element: <OrderSuccesPage></OrderSuccesPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswoedPage></ForgotPasswoedPage>,
  },

  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const checkedUser = useSelector(selectUserChecked);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(checkAuthAsync());
  }, []);
  useEffect(() => {
    if (user) {
      dispath(addToCartByUserAsync());
      dispath(fetchLoggedInUserAsync());

      //user.id
      /* dispath(fetchLoggedInUserOrdersAsync()); //user.id */
    }
  }, [dispath, user]);
  return (
    <div className="App">
      {checkedUser && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
