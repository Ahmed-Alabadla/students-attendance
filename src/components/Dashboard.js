import { Avatar, Card, Col, Row } from "antd";
import React from "react";
import Meta from "antd/es/card/Meta";
import {
  BsFillArrowRightCircleFill,
  BsPeopleFill,
  BsSignIntersectionFill,
} from "react-icons/bs";
import { SiGoogleassistant, SiReasonstudios } from "react-icons/si";
import { ImBook } from "react-icons/im";

const Dashboard = () => {
  return (
    // bg-[#f5f5f5]
    <div className="home bg-[#F4F6F9]  h-full p-5 rounded-lg">
      <Row gutter={[24, 24]}>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <button className="flex justify-center items-center gap-1 text-base mx-auto">
                More info
                <BsFillArrowRightCircleFill size={18} />
              </button>,
            ]}
          >
            <Meta
              title="120"
              description="Total student"
              avatar={
                // <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <div className="p-1.5 bg-[#D2D6DE] rounded-lg mt-2">
                  <SiReasonstudios size={35} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <button className="flex justify-center items-center gap-1 text-base mx-auto">
                More info
                <BsFillArrowRightCircleFill size={18} />
              </button>,
            ]}
          >
            <Meta
              title="20"
              description="Total instructor"
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <BsPeopleFill size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <button className="flex justify-center items-center gap-1 text-base mx-auto">
                More info
                <BsFillArrowRightCircleFill size={18} />
              </button>,
            ]}
          >
            <Meta
              title="20"
              description="Total assistant"
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <SiGoogleassistant size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <button className="flex justify-center items-center gap-1 text-base mx-auto">
                More info
                <BsFillArrowRightCircleFill size={18} />
              </button>,
            ]}
          >
            <Meta
              title="80"
              description="Total section"
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <BsSignIntersectionFill size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card
            actions={[
              <button className="flex justify-center items-center gap-1 text-base mx-auto">
                More info
                <BsFillArrowRightCircleFill size={18} />
              </button>,
            ]}
          >
            <Meta
              title="30"
              description="Total course"
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <ImBook size={30} />
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
