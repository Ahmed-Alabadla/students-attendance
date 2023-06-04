import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

const AddSection = ({ showModal, setShowModal, setTableData }) => {
  // ----------------------------
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const token = sessionStorage.getItem("token");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log(values);
    api
      .post("sections", values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
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
        setTableData((prev) => {
          return [...prev, res.data.data];
        });
        setShowModal(false);
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
    // console.log("Received values of form: ", values);
  };

  // ----------courses------------------

  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    if (token) {
      api
        .get("courses", {
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
        Add Section
      </p>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: 700,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="number"
          label="Section nubmer"
          rules={[
            {
              required: true,
              message: "Please input your section number!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a section number" />
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
          <Select placeholder="select Course" size="large">
            {coursesList.map((item) => (
              <Option value={item.id}>{item.title}</Option>
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

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Add Section
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSection;
