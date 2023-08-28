import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  deleteFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./CartSlice";
import { ColorRing } from "react-loader-spinner";
import Model from "../Common/Model";
import { selectLoggedInUser } from "../Auth/Components/AuthSlice";

export function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [openModel, setOpenModel] = useState();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const [userCart, setUseCart] = useState([...items]);

  const status = useSelector(selectCartStatus);
  const alert = useAlert();
  const user = useSelector(selectLoggedInUser);
  const totalAmount = userCart?.reduce(
    (amount, item) =>
      Math.round(
        item.product.price * (1 - item.product.discountPercentage / 100)
      ) *
        item.quantity +
      amount,
    0
  );

  const totalItems = userCart?.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleChange = (item, quantity) => {
    dispatch(
      updateCartAsync({
        id: item.id,
        quantity: +quantity,
        product: item.product.id,
      })
    );
  };

  const handleChange1 = async (e, userItem) => {
    let indexOfItem = -1;
    if (e.target.value === "-" && userItem.quantity > 1) {
      const index = await userCart.findIndex((item) => item.id === userItem.id);
      indexOfItem = index;
      userCart.splice(index, 1, {
        ...userItem,
        quantity: userItem.quantity - 1,
      });
    } else if (userItem.quantity > 9) {
      alert.error("The maximum limit of quantity is 10 !");
    } else if (e.target.value === "-" && userItem.quantity === 1) {
      const deleteIndex = userCart.findIndex((item) => item.id === userItem.id);
      userCart.splice(deleteIndex, 1);
      indexOfItem = -1;
      dispatch(deleteFromCartAsync(userItem.id));
    } else {
      const index = await userCart.findIndex((item) => item.id === userItem.id);
      indexOfItem = index;
      userCart.splice(index, 1, {
        ...userItem,
        quantity: userItem.quantity + 1,
      });
    }

    handleChange(userItem, indexOfItem > -1 && userCart[indexOfItem].quantity);
  };

  const handleDelete = async (e, itemId) => {
    const index = await userCart.findIndex((item) => item.id === itemId);
    userCart.splice(index, 1);
    dispatch(deleteFromCartAsync(itemId));
  };

  return (
    <>
      {!userCart.length && cartLoaded && <Navigate to="/"></Navigate>}

      <div>
        <div className="mx-auto relative lg:mt-12   lg:bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className=" text-4xl py-8 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className=" border-t pb-7 pt-1 border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <div
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10
              sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
              >
                {status === "lading" ? (
                  <div className="flex items-center justify-center">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  </div>
                ) : null}

                <ul role="list" className="-my-6  divide-y divide-gray-200">
                  {userCart?.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4  flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.href}>
                                {item.product.title}
                              </a>
                            </h3>
                            <p className="ml-4  absolute right-7  lg:right-16 lg:right-15">
                              ${" "}
                              {Math.round(
                                item.product.price *
                                  (1 - item.product.discountPercentage / 100)
                              )}
                            </p>
                          </div>
                          <p className="mt-1 flex text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className=" flex mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Quantity
                            </label>

                            <div className="flex">
                              <button
                                onClick={(e) => handleChange1(e, item)}
                                value="-"
                                className="py-0 px-2.5  bg-gray-400 text-black font-bold border border-gray-400  "
                              >
                                -
                              </button>
                              <button
                                value="0"
                                className="py-0 px-2.5 border border-gray-400 "
                              >
                                {item.quantity}
                              </button>
                              <button
                                className="py-0 px-2 bg-gray-400 text-black font-bold border border-gray-400  "
                                onClick={(e) => handleChange1(e, item)}
                                value="+"
                              >
                                +
                              </button>
                            </div>
                          </p>

                          <div className="flex pb-4 ">
                            <Model
                              title={`Delete ${item.product.title}`}
                              message="Are you sure you want to delete this item from cart"
                              dangerOption="Delete"
                              cancelOption="Cancel"
                              cancelAction={() => setOpenModel(-1)}
                              dangerAction={(e) => handleDelete(e, item.id)}
                              showModel={openModel === item.id}
                            ></Model>

                            <button
                              onClick={(e) => setOpenModel(item.id)}
                              type="button"
                              className="font-medium absolute right-7  lg:right-16 lg:right-15 text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p> Total items in cart</p>
              <p className="flex ">
                {totalItems}
                {`${totalItems <= 1 ? " item" : " items"}`}
              </p>
            </div>
            <p className="mt-0.5 pt-10  text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p className="pr-1">
                or
                <Link to="/"></Link>
              </p>
              <Link to="/">
                <button
                  type="button"
                  className="font-medium pl-1 text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
