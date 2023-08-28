import React from "react";
import ProductDetail from "../features/Product/Components/Productdetail";
import Navbar from "../features/Navbar.js/Navbar";
import AdminOrder from "../features/Admin/Components/AdminOrder";

const AdminOrderPage = () => {
  return (
    <div>
      <Navbar>
        {" "}
        <AdminOrder></AdminOrder>
      </Navbar>
    </div>
  );
};

export default AdminOrderPage;
