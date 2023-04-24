import { Button, Form, Input, Select } from "antd";
import React from "react";
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

const AddSection = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    window.location.assign("/qr");
    console.log("Received values of form: ", values);
    form.resetFields();
  };

  return (
    <div className="bg-[#f5f5f5] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Add Section
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
          name="section_name"
          label="Section Name"
          rules={[
            {
              required: true,
              message: "Please input your section name!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a section name" />
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
          name="room_number"
          label="Room Number"
          rules={[
            {
              required: true,
              message: "Please select room_number!",
            },
          ]}
        >
          <Select placeholder="select Room Number" size="large">
            <Option value="room1">Room 1</Option>
            <Option value="room2">Room 2</Option>
            <Option value="room3">Room 3</Option>
            <Option value="room4">Room 4</Option>
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

        <Form.Item className="">
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
    </div>
  );
};

export default AddSection;
