import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import { BsPeopleFill, BsSignIntersectionFill } from "react-icons/bs";
import {
  SiGoogleassistant,
  SiGoogleclassroom,
  SiReasonstudios,
} from "react-icons/si";
import { ImBook } from "react-icons/im";
import api from "./api";

const Dashboard = () => {
  const token = sessionStorage.getItem("token");
  const type = sessionStorage.getItem("type");
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "assistant") {
      window.location.replace("/lectures");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (token) {
      api
        .get("dashboard", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setItems(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    // bg-[#f5f5f5]
    <div className="home bg-[#F4F6F9]  h-full p-5 rounded-lg">
      <Row gutter={[24, 24]}>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card loading={loading}>
            <Meta
              title={items.number_of_instructors}
              description={<p className="text-base">Total instructor</p>}
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <BsPeopleFill size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card loading={loading}>
            <Meta
              title={items.number_of_assistants}
              description={<p className="text-base">Total assistant</p>}
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
            // actions={[
            //   <button className="flex justify-center items-center gap-1 text-base mx-auto">
            //     More info
            //     <BsFillArrowRightCircleFill size={18} />
            //   </button>,
            // ]}
            loading={loading}
          >
            <Meta
              title={items.number_of_students}
              description={<p className="text-base">Total student</p>}
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
          <Card loading={loading}>
            <Meta
              title={items.number_of_sections}
              description={<p className="text-base">Total section</p>}
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <BsSignIntersectionFill size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card loading={loading}>
            <Meta
              title={items.number_of_courses}
              description={<p className="text-base">Total course</p>}
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <ImBook size={30} />
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} lg={8}>
          <Card loading={loading}>
            <Meta
              title={items.number_of_rooms}
              description={<p className="text-base">Total rooms</p>}
              avatar={
                <div className="p-2 bg-[#D2D6DE] rounded-lg mt-2">
                  <SiGoogleclassroom size={30} />
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
