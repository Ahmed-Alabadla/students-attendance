import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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

const Attendances = () => {
  const route = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      route("/login");
    }
  }, []);
  // ----------------------

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    route("/show-attendances");
    form.resetFields();
  };

  return (
    <div className="bg-[#f5f5f5] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Attendances
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: 700,
        }}
        scrollToFirstError
      >
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
            <Option value="2023_2024">2023-2024</Option>
            <Option value="2022_2023">2022-2023</Option>
            <Option value="2021_2022">2021-2022</Option>
            <Option value="2020_2021">2020-2021</Option>
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
            <Option value="first_semester">First Semester</Option>
            <Option value="first_semester">Second Semester</Option>
            <Option value="summer_semester">Summer Semester</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="courseID"
          label="Course ID"
          rules={[
            {
              required: true,
              message: "Please select course!",
            },
          ]}
        >
          <Select placeholder="select Course" size="large">
            <Option value="ECOM3401">DB</Option>
            <Option value="ECOM3302">Java 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="section"
          label="Section "
          rules={[
            {
              required: true,
              message: "Please select section!",
            },
          ]}
        >
          <Select placeholder="select Section " size="large">
            <Option value="101">101</Option>
            <Option value="102">102</Option>
            <Option value="103">103</Option>
            <Option value="104">104</Option>
          </Select>
        </Form.Item>

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Show Attendance
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Attendances;
