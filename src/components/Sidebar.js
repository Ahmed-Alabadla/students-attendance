import React, { useEffect } from "react";

import {
  ArrowRightOutlined,
  EyeFilled,
  HomeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { CgPlayListAdd } from "react-icons/cg";
import { SiGooglesheets, SiGoogleclassroom } from "react-icons/si";

import { Avatar, Breadcrumb, Layout, Menu, Tooltip } from "antd";

import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const route = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      route("/login");
    }
  }, []);
  // ------------------------------------------
  const items = [
    getItem(
      <Tooltip title="Go to Profile" placement="right" color={"#008ecc"}>
        <button
          onClick={() => route("profile")}
          className="positionArrow flex justify-between items-center w-full"
        >
          <p className="hiddenName text-lg ">Ahmed Alabadla</p>
          <ArrowRightOutlined style={{ fontSize: "22px" }} />
        </button>
      </Tooltip>,
      "profile"
    ),

    getItem(
      <button onClick={() => route("/")} className="w-full text-start">
        Show
      </button>,
      "1",
      <EyeFilled style={{ fontSize: "22px" }} onClick={() => route("/")} />
    ),

    getItem(
      <button onClick={() => route("add-assistant")}>Add Assistant / I</button>,
      "add-assistant",
      <UserAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("add-assistant")}
      />
    ),
    getItem(
      <button onClick={() => route("add-instructor")}>
        Add Instructor / A
      </button>,
      "add-instructor",
      <UserAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("add-instructor")}
      />
    ),
    getItem(
      <button onClick={() => route("add-students")}>Add Students / A</button>,
      "add-students",
      <UsergroupAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("add-student")}
      />
    ),

    getItem("Add Course / A", "3", <CgPlayListAdd size={30} />),
    getItem(
      <button onClick={() => route("add-section")}>Add Section / TA</button>,
      "4",
      <CgPlayListAdd size={30} onClick={() => route("add-section")} />
    ),

    getItem("Add class room /A", "6", <SiGoogleclassroom size={25} />),
    getItem(
      "Attendance sheets",
      "7",
      <SiGooglesheets style={{ fontSize: "22px" }} />
    ),
    // getItem("Export Reports", "8", <CiExport size={28} />),
  ];

  // ------------------------------------

  const breadcrumbNameMap = {
    "/profile": "Profile",
    "/add-section": "Add Section",
    "/add-course": "Add Course",
    "/add-assistant": "Add Assistant",
    "/add-instructor": "Add Instructor",
    "/add-students": "Add Students",
  };

  const pathSnippets = window.location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: (
        <Link to="/">
          <span className="flex gap-1 items-center ">
            <HomeOutlined /> Home
          </span>
        </Link>
      ),
      key: "home",
    },
  ].concat(extraBreadcrumbItems);

  // --------------------

  return (
    <>
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
        theme="light"
      >
        <button className="text-center text-3xl font-medium mt-5 text-[#008ecc] font-signature">
          {collapsed ? "LOGO" : "Students Attendance"}
        </button>

        {/* -------- */}
        <div className="profile flex flex-col  gap-3 mt-14">
          <button onClick={() => route("profile")} className="btnHidden mx-7">
            <Avatar
              className="flex items-center justify-center bg-red-500 text-2xl"
              size="large"
            >
              A
            </Avatar>
          </button>
        </div>
        {/* -------- */}
        <Menu
          theme="light"
          defaultSelectedKeys={
            pathSnippets.join().length > 0 ? pathSnippets.join() : "1"
          }
          mode="inline"
          items={items}
          className="flex flex-col gap-1 text-lg"
        />
      </Sider>
      <Layout className="container">
        <Breadcrumb
          items={breadcrumbItems}
          className="bg-[#E6F4FF] px-4 py-3 rounded-lg mt-14 mb-10 text-base "
        />
        <Outlet />
      </Layout>
    </>
  );
};
export default Sidebar;
