const express = require("express");

const {
  createOrder,
  feltchUserByOrder,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
} = require("../Controller/Order");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/own/", feltchUserByOrder)
  .get("/", fetchAllOrders)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

module.exports = router;
