const express = require("express");
const {
  addToCart,
  feltchCartByUser,
  updateCart,
  deleteCart,
} = require("../Controller/Cart");

const router = express.Router();

router
  .post("/", addToCart)
  .get("/", feltchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteCart);

module.exports = router;
