import React from "react";
import ProductDetail from "../features/Product/Components/Productdetail";
import Navbar from "../features/Navbar.js/Navbar";
import AdminProductDetail from "../features/Admin/Components/AdminProductdetail";

const AdminProductDetailPage = () => {
  return (
    <div>
      <Navbar>
        {" "}
        <AdminProductDetail></AdminProductDetail>
      </Navbar>
    </div>
  );
};

export default AdminProductDetailPage;
