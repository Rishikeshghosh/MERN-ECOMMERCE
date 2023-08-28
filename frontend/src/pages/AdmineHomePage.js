import React from "react";
import ProductDetail from "../features/Product/Components/Productdetail";
import Navbar from "../features/Navbar.js/Navbar";
import AdminProductDetail from "../features/Admin/Components/AdminProductdetail";
import { AdminProductList } from "../features/Admin/Components/AdminProductList";

const AdminHomePage = () => {
  return (
    <div>
      <Navbar>
        {" "}
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
};

export default AdminHomePage;
