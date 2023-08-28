const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  findProduct,
  updateProduct,
} = require("../Controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", findProduct)
  .patch("/:id", updateProduct);

module.exports = router;
