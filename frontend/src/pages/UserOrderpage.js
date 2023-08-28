import React from "react";
import Navbar from "../features/Navbar.js/Navbar";
import UserOrders from "../features/User/Components/UserOrders";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="px-auto text-3xl lg:text-4xl font-bold mt-24 lg:mt-20  ">
          My Order
        </h1>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
};

export default UserOrderPage;
