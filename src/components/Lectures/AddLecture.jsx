import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import { useDispatch } from "react-redux";
import { setLectureId } from "../../redux/lectureSlice";
import { useNavigate } from "react-router-dom";

const AddLecture = ({ showModal, setShowModal, setTableData }) => {
  // ----------------------------
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };

  const dispatch = useDispatch();
  const route = useNavigate();

  const token = sessionStorage.getItem("token");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    api
      .post("lectures", values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLectureId({ ...res.data.data, name: res.data.data.title }));
        sessionStorage.setItem("lecture_id", res.data.data);

        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        form.resetFields();
        setShowModal(false);
        // setTableData((prev) => {
        //   return [...prev, res.data.data];
        // });
        route("/record-attendance");
      })
      .catch((err) => {
        // console.log(err);

        toast.error(err.response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    // console.log("Received values of form: ", data);
  };

  // ----------courses------------------

  const [coursesList, setCoursesList] = useState([]);
  const assistant_id = sessionStorage.getItem("assistant_id");
  useEffect(() => {
    if (token) {
      api
        .get(`courses?assistant_id=${assistant_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCoursesList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  // ----------Sections in course------------------

  const [sectionList, setSectionList] = useState([]);
  const [course_id, setCourse_id] = useState();
  useEffect(() => {
    if (token) {
      api
        .get(`sections?course_id=${course_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSectionList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [course_id, token]);

  // ----------Rooms------------------

  const [roomsList, setRoomsList] = useState([]);
  useEffect(() => {
    if (token) {
      api
        .get("rooms", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRoomsList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  return (
    <Modal
      open={showModal}
      onCancel={() => {
        setShowModal(false);
        form.resetFields();
      }}
      footer={[]}
      style={{
        top: 35,
      }}
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Add Lecture
      </p>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        className="mx-auto mt-8"
        style={{
          width: "100%",
          maxWidth: 700,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a title" />
        </Form.Item>

        <Form.Item
          name="course_id"
          label="Course "
          rules={[
            {
              required: true,
              message: "Please select course!",
            },
          ]}
        >
          <Select
            placeholder="select Course"
            size="large"
            onChange={(value) => setCourse_id(value)}
          >
            {coursesList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="section_id"
          label="Section "
          rules={[
            {
              required: true,
              message: "Please select section!",
            },
          ]}
        >
          <Select placeholder="select Section " size="large">
            {sectionList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.number}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="semester"
          label="Semester"
          rules={[
            {
              required: true,
              message: "Please select semester!",
            },
          ]}
        >
          <Select placeholder="select semester" size="large">
            <Option value="first">First Semester</Option>
            <Option value="second">Second Semester</Option>
            <Option value="summer">Summer Semester</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="year"
          label="Year"
          rules={[
            {
              required: true,
              message: "Please select year!",
            },
          ]}
        >
          <Select placeholder="select year" size="large">
            <Option value="2020-2021">2020-2021</Option>
            <Option value="2021-2022">2021-2022</Option>
            <Option value="2022-2023">2022-2023</Option>
            <Option value="2023-2024">2023-2024</Option>
            <Option value="2024-2025">2024-2025</Option>
            <Option value="2025-2026">2025-2026</Option>
            <Option value="2026-2027">2026-2027</Option>
            <Option value="2027-2028">2027-2028</Option>
            <Option value="2028-2029">2028-2029</Option>
            <Option value="2029-2030">2029-2030</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="room_id"
          label="Room"
          rules={[
            {
              required: true,
              message: "Please select room!",
            },
          ]}
        >
          <Select placeholder="select Room Number" size="large">
            {roomsList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.building + item.number}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLecture;
