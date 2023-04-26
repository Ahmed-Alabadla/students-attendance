import React, { useEffect } from "react";

import {
  ArrowRightOutlined,
  DashboardOutlined,
  EyeFilled,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { CgPlayListAdd } from "react-icons/cg";
import { SiGooglesheets, SiGoogleclassroom } from "react-icons/si";

import { Avatar, Breadcrumb, Button, Layout, Menu, Tooltip } from "antd";

import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

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

  const type_user = localStorage.getItem("type");

  const items_assistant = [
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
        Dashboard
      </button>,
      "1",
      <EyeFilled style={{ fontSize: "22px" }} onClick={() => route("/")} />
    ),

    getItem(
      <button onClick={() => route("sections")}>Sections</button>,
      "sections",
      <CgPlayListAdd size={30} onClick={() => route("sections")} />
    ),

    getItem(
      <button onClick={() => route("attendances")}>Attendances</button>,
      "attendances",
      <EyeFilled
        style={{ fontSize: "22px" }}
        onClick={() => route("attendances")}
      />
    ),

    getItem(
      "Export Reports",
      "7",
      <SiGooglesheets style={{ fontSize: "22px" }} />
    ),
  ];

  const items_instructor = [
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
        Dashboard
      </button>,
      "1",
      <DashboardOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("/")}
      />
    ),

    getItem(
      <button onClick={() => route("assistants")}>Assistants</button>,
      "assistants",
      <UserAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("assistants")}
      />
    ),
    getItem(
      <button onClick={() => route("attendances")}>Attendances</button>,
      "attendances",
      <EyeFilled
        style={{ fontSize: "22px" }}
        onClick={() => route("attendances")}
      />
    ),
  ];

  const items_admin = [
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
        Dashboard
      </button>,
      "1",
      <DashboardOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("/")}
      />
    ),

    getItem(
      <button onClick={() => route("instructors")}>Instructors</button>,
      "instructors",
      <UserAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("instructors")}
      />
    ),
    getItem(
      <button onClick={() => route("students")}>Students</button>,
      "students",
      <UsergroupAddOutlined
        style={{ fontSize: "22px" }}
        onClick={() => route("students")}
      />
    ),

    getItem(
      <button onClick={() => route("courses")}>Courses</button>,
      "courses",
      <CgPlayListAdd size={30} onClick={() => route("courses")} />
    ),

    getItem(
      <button onClick={() => route("classrooms")}>Classrooms</button>,
      "classrooms",
      <SiGoogleclassroom size={25} onClick={() => route("classrooms")} />
    ),
  ];

  // ------------------------------------

  const breadcrumbNameMap = {
    "/profile": "Profile",
    "/sections": "Sections",
    "/courses": "Courses",
    "/assistants": "Assistants",
    "/instructors": "Instructors",
    "/students": "Students",
    "/classrooms": "Classrooms",
    "/attendances": "Attendances",
    "/show-attendances": "Show Attendances",
    "/record-attendance": "Record Attendance",
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
        trigger={null}
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
          items={
            type_user === "admin"
              ? items_admin
              : type_user === "instructor"
              ? items_instructor
              : items_assistant
          }
          className="flex flex-col gap-1 text-lg"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Layout className="container">
          <Breadcrumb
            items={breadcrumbItems}
            className="bg-[#E6F4FF] px-4 py-3 rounded-lg mt-5 mb-14 text-base"
          />
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};
export default Sidebar;
