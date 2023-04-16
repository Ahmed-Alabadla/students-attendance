import React from "react";

import { UserAddOutlined } from "@ant-design/icons";
import { CgPlayListAdd } from "react-icons/cg";
import { SiGooglesheets } from "react-icons/si";
import { CiExport } from "react-icons/ci";
import { BsFillPersonPlusFill } from "react-icons/bs";

import { Layout, Menu } from "antd";

import { useState } from "react";

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    "Add Teaching Assistant /M",
    "1",
    <UserAddOutlined style={{ fontSize: "22px" }} />
  ),
  getItem("Add Course / M", "2", <CgPlayListAdd size={30} />),
  getItem("Add Section / TA", "3", <CgPlayListAdd size={30} />),
  getItem("Add Students /TA", "4", <BsFillPersonPlusFill size={28} />),
  getItem(
    "Attendance sheets",
    "6",
    <SiGooglesheets style={{ fontSize: "22px" }} />
  ),
  getItem("Export Reports", "5", <CiExport size={28} />),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
        console.log(value);
      }}
      theme="light"
    >
      <button className="text-center text-3xl font-medium mt-5 text-[#008ecc] font-signature">
        {collapsed ? "LOGO" : "Students Attendance"}
      </button>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="flex flex-col gap-1.5 text-lg mt-20"
      />
    </Sider>
  );
};
export default Sidebar;
