import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutUserAsync } from "./AuthSlice";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOutUserAsync(user.id));
  }, []);
  return (
    <>
      {!user && (
        <Navigate to="/login" replace={true}>
          {" "}
        </Navigate>
      )}
    </>
  );
};

export default LogOut;
