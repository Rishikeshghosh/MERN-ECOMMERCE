import { useSelector } from "react-redux";
import React from "react";
import { selectLoggedInUser, createUserAsync } from "./AuthSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../User/UserSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user /* && userInfo?.role === "admin" */) {
    /* return <Navigate to="/" replace={true}></Navigate>; */
  }
  return children;
};

export default ProtectedAdmin;
