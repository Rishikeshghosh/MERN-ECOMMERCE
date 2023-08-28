import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <>
        {/* This is an example component */}
        <div className=" bg-gray-900">
          <div className="max-w-2xl mx-auto text-white py-10">
            <div className="text-center">
              <h3 className="text-3xl mb-8"> Download Our Ecommerce App </h3>
              <p>
                {" "}
                Commerce is better than chocolate. Make the world a better place
                with Commerce and help our community to grow and help them to
                achive the greatness{" "}
              </p>
              <div className="flex justify-center my-10">
                <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Google Play Store </p>
                  </div>
                </div>
                <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                    className="w-7 md:w-8"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Apple Store </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-18 lg:mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
              <p className="order-2 md:order-1 mt-8 md:mt-0">
                {" "}
                © All The Rights Reserved By Rishikesh Ghosh 2023.{" "}
              </p>

              <div className="order-1 md:order-2">
                <span className="px-2">About us</span>
                <span className="px-2 border-l">Contact us</span>
                <span className="px-2 border-l">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Footer;
