const express = require("express");
const { createUser, fetchUserById, updateUser } = require("../Controller/User");

const router = express.Router();

router.get("/own", fetchUserById).patch("/:id", updateUser);

module.exports = router;
