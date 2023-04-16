import { Avatar, Dropdown, Layout, Space } from "antd";
import React from "react";

const Navbar = () => {
  const { Header } = Layout;
  const items = [
    {
      label: <button className="text-lg">Profile</button>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <button className="text-red-500 text-lg">Log out</button>,
      key: "1",
    },
  ];
  return (
    <Layout>
      <Header className="bg-white flex justify-end items-center">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <button className="flex items-center">
            <Space>
              <p className="text-lg hidden sm:block">Ahmed Alabadla</p>
              <Avatar
                className="flex items-center justify-center bg-red-500 text-2xl"
                size="large"
              >
                A
              </Avatar>
            </Space>
          </button>
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default Navbar;
