import { LogoutOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const Profile = () => {
  const route = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      route("/login");
    }
  }, []);
  // ----------------------

  const handleSignOut = () => {
    if (token) {
      api
        .delete("logout", {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.removeItem("token");
          localStorage.removeItem("type");
          route("/login");
        });
    }
  };
  return (
    <div className="">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Your Profile
      </p>
      <div className="container flex flex-col gap-5 items-end mt-12">
        <Button
          className="flex items-center w-fit "
          shape="round"
          icon={<LogoutOutlined />}
          danger
          onClick={handleSignOut}
        >
          Sign out
        </Button>
        <div className="flex flex-col gap-7 w-full">
          <div className="relative w-full">
            <input
              name="email"
              type="email"
              id="labelEmail"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
              value="ahmed@gmail.com"
              readOnly
            />
            <label
              for="labelEmail"
              className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="relative flex items-center ">
            <div className="w-full">
              <input
                name="name"
                type="text"
                id="labelName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
                value="Ahmed Alabadla"
                readOnly
              />
              <label
                for="labelName"
                className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Your Name
              </label>
            </div>

            <button
              type="button"
              className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ml-5 sm:ml-10"
            >
              Change
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="w-full">
              <input
                name="password"
                type="text"
                id="labelPassword"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
                value="********"
                readOnly
              />
              <label
                for="labelPassword"
                className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
            </div>
            <button
              type="button"
              className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ml-5 sm:ml-10"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
