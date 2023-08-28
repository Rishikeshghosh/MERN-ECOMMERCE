import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectuser,
  selectUserInfoStaus,
  selectUserOrders,
  selectUserInfo,
} from "../UserSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../Auth/Components/AuthSlice";
import { ColorRing } from "react-loader-spinner";

const UserOrders = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const userOrders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStaus);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchLoggedInUserOrdersAsync());
    }
  }, [dispatch]);

  return (
    <div>
      {status === "loading" ? (
        <div className="flex items-center justify-center py-40">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : null}
      {userOrders &&
        userOrders.map((order, index) => (
          <div key={index}>
            <div className="mx-auto mt-[-2rem] lg:mt-10  lg:bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className=" flex text-lg lg:text-4xl pb-2 pt-20 font-bold tracking-tight text-gray-900">
                Order Id : <span className="pl-2">#{order.id}</span>
              </h1>
              <h3
                className={`flex text-lg pb-5 lg:text-4xl font-bold tracking-tight `}
              >
                Order Status :
                <span
                  className={`${
                    order.status === "pending"
                      ? "text-red-900"
                      : "dispatched"
                      ? " text-yellow-500"
                      : "delivered"
                      ? "text-green-900"
                      : "text-yellow-50"
                  } pl-4`}
                >
                  {order.status}
                </span>
              </h3>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>
                                  {item.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${" "}
                                {Math.round(
                                  item.product.price *
                                    (1 - item.product.discountPercentage / 100)
                                )}
                              </p>
                            </div>
                            <p className="mt-[15px] flex text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty {item.quantity}
                              </label>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p> Total items in cart</p>
                  <p className="flex ">
                    {order.items.map((item) => item.quantity)}{" "}
                    {order.items.map((item) =>
                      item.quantity === 1 ? "item" : "items"
                    )}
                  </p>
                </div>
                <p className="mt-0.5 py-5 pl-1 flex pt-10  text-sm text-black">
                  Shipping Address :
                </p>
                <div className="flex pt-12 relative justify-between gap-x-1 py-5  px-3 border-solid border-2 border-gray-200 ">
                  <div className="flex  gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg absolute left-3 bottom-[75px] font-semibold leading-6 text-gray-900">
                        Name : {order.selectAddress.name}
                      </p>

                      <p className="mt-1 flex truncate text-sm leading-5 text-gray-500">
                        Street: {order.selectAddress.street}
                      </p>
                      <p className="mt-1 flex truncate text-sm leading-5 text-gray-500">
                        Pincode: {order.selectAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className=" sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm flex absolute right-3 bottom-[42px] leading-6 text-gray-500">
                      Phone : {order.selectAddress.phone}
                    </p>
                    <p className="text-sm leading-6 absolute right-[53px] bottom-[18px] text-gray-500">
                      City: {order.selectAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserOrders;
