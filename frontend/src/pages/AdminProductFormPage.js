import React from "react";
import ProductForm from "../features/Admin/Components/ProductForm";
import Navbar from "../features/Navbar.js/Navbar";

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
};

export default AdminProductFormPage;
