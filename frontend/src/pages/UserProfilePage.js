import React from "react";
import Navbar from "../features/Navbar.js/Navbar";

import UserProfile from "../features/User/Components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="px-auto mt-24 lg:mt-20  text-3xl lg:text-4xl font-bold  ">
          My Profile
        </h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
