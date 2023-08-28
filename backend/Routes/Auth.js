const express = require("express");
const passport = require("passport");
const {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logOut,
} = require("../Controller/Auth");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get("/logout", logOut);

module.exports = router;
