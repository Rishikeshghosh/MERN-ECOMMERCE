import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/Constant";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectorders,
  updateOrderAsync,
} from "../../Auth/Components/Order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/20/solid";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const orders = useSelector(selectorders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = (order) => {
    setEditableOrderId(order.id);
  };

  const handleSort = (option) => {
    const sorted = {
      _sort: option.sort,
      _order: option.order,
    };

    setSort(sorted);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  useEffect(() => {
    const pagination = { _page: page, limit: ITEMS_PER_PAGE };

    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className=" min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 cursor-pointer text-gray-600 uppercase text-sm leading-normal">
                    <th
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                      className="py-3 px-0 text-left"
                    >
                      Order Number{" "}
                      {sort._sort === "id" && sort._order === "asc" ? (
                        <ArrowUpIcon className="inline w-6 h-6"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="inline w-6 h-6"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-3 px-0 text-left">Items</th>
                    <th className="py-3 px-0 text-center">
                      <th
                        onClick={(e) =>
                          handleSort({
                            sort: "totalAmount",
                            order: sort._order === "asc" ? "desc" : "asc",
                          })
                        }
                        className="py-3 px-0 text-left"
                      >
                        Total Amount{" "}
                        {sort._sort === "totalAmount" &&
                        sort._order === "asc" ? (
                          <ArrowUpIcon className="inline w-6 h-6"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="inline w-6 h-6"></ArrowDownIcon>
                        )}
                      </th>
                    </th>
                    <th className="py-3 px-0 text-center">Shiping Address</th>
                    <th className="py-3 px-0 text-center">Status</th>
                    <th className="py-3 px-0 text-center">Edit</th>
                    <th className="py-3 px-0 text-center">
                      <th
                        onClick={(e) =>
                          handleSort({
                            sort: "createdAt",
                            order: sort._order === "asc" ? "desc" : "asc",
                          })
                        }
                        className="py-3 px-0 text-left"
                      >
                        Order Time{" "}
                        {sort._sort === "createdAt" && sort._order === "asc" ? (
                          <ArrowUpIcon className="inline w-6 h-6"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="inline w-6 h-6"></ArrowDownIcon>
                        )}
                      </th>
                      <th className="py-3 px-0 text-center">
                        <th
                          onClick={(e) =>
                            handleSort({
                              sort: "updatedAt",
                              order: sort._order === "asc" ? "desc" : "asc",
                            })
                          }
                          className="py-3 px-0 text-left"
                        >
                          Last Update{" "}
                          {sort._sort === "updatedAt" &&
                          sort._order === "asc" ? (
                            <ArrowUpIcon className="inline w-6 h-6"></ArrowUpIcon>
                          ) : (
                            <ArrowDownIcon className="inline w-6 h-6"></ArrowDownIcon>
                          )}
                        </th>
                      </th>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      {order.items.map((item, index) => (
                        <td key={index} className="py-3 px-0 text-left">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - ${" "}
                              {item.product.price}
                            </span>
                          </div>
                        </td>
                      ))}
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          $ {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          <strong>Name: {order.selectAddress.name}</strong>
                        </div>
                        <div>Street: {order.selectAddress.street}</div>
                        <div>City: {order.selectAddress.city}</div>
                        <div>State: {order.selectAddress.state}</div>
                        <div>Pincode: {order.selectAddress.pinCpde}</div>
                        <div>Phone : {order.selectAddress.phone}</div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {editableOrderId === order.id ? (
                          <div className="flex item-center justify-center">
                            <select onChange={(e) => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cencelled</option>
                            </select>

                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                          </div>
                        ) : (
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <span
                              className={`${chooseColor(
                                order.status
                              )}py-1 px-3 rounded-full text-sm`}
                            >
                              {order.status}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                          <EyeIcon
                            onClick={(e) => handleShow(order)}
                            className="w-6 h-6"
                          ></EyeIcon>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                          <PencilIcon
                            onClick={(e) => handleEdit(order)}
                            className="w-6 h-6"
                          ></PencilIcon>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt &&
                            new Date(order.createdAt).toLocaleString()}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt &&
                            new Date(order.updatedAt).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
