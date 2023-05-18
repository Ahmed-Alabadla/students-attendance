import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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
    const data = {
      number: values.number,
      course_id: values.course_id,
      semester: values.semester,
      year: `${values.year.$y}-${values.year.$y + 1}`,
    };
    api
      .post("sections", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
        console.log(err);

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

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
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
          <DatePicker
            // onChange={(ev) => console.log(ev.$y)}
            picker="year"
            disabledDate={disabledDate}
            size="large"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="room_number"
          label="Room Number"
          rules={
            [
              // {
              //   required: true,
              //   message: "Please select room_number!",
              // },
            ]
          }
        >
          <Select placeholder="select Room Number" size="large">
            <Option value="room1">Room 1</Option>
            <Option value="room2">Room 2</Option>
            <Option value="room3">Room 3</Option>
            <Option value="room4">Room 4</Option>
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
