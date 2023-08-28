const express = require("express");
const { feltchAllBrands, createBrands } = require("../Controller/Brand");
const router = express.Router();

router.get("/", feltchAllBrands).post("/", createBrands);

module.exports = router;
