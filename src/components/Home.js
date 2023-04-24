import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import Courses from "./Courses";

const Home = () => {
  return (
    <div className="home bg-[#f5f5f5] h-full p-5 rounded-lg">
      <Tabs defaultActiveKey="1" centered size="large">
        <TabPane tab="Lecture Times" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Courses" key="2">
          <Courses />
        </TabPane>
        <TabPane tab="Sections" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Rooms" key="4"></TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
