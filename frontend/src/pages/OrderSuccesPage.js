import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/Cart/CartSlice";
import { orderReset } from "../features/Auth/Components/Order/OrderSlice";
import { selectLoggedInUser } from "../features/Auth/Components/AuthSlice";

const OrderSuccesPage = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(orderReset());
  }, [dispatch, user]);
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-semibold text-rose-600">
              Congratulations !{" "}
              <span className="flex items-center justify-center">
                <img
                  className="h-24 w-24"
                  src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/party-popper_1f389.gif"
                ></img>
              </span>
            </p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your order has been placed Succesfully .
            </h1>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your order number is #{params?.id}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              You can check your order in My Account - MyOrder
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <Link to="/order" className="text-sm font-semibold text-gray-900">
                Go to Myorder <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderSuccesPage;
