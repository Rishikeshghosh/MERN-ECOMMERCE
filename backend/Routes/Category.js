const express = require("express");
const {
  fetchAllCategories,
  createCategories,
  findCategory,
} = require("../Controller/Category");

const router = express.Router();

router
  .get("/", fetchAllCategories)
  .post("/", createCategories)
  .get("/:id", findCategory);

module.exports = router;
