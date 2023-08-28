import React from "react";
import ProductDetail from "../features/Product/Components/Productdetail";
import Navbar from "../features/Navbar.js/Navbar";
import Footer from "../features/Common/Footer";

const ProductDetailPage = () => {
  return (
    <div>
      <Navbar>
        {" "}
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default ProductDetailPage;
