import { Button, Form, Input, Select, Space } from "antd";
import React from "react";

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

const AddStudent = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();
  };

  return (
    <div className="bg-[#f5f5f5] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Add Student
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="mx-auto"
        initialValues={{
          prefix: "059",
        }}
        style={{
          width: "100%",
          maxWidth: 700,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="student_name"
          label="Student Name"
          rules={[
            {
              required: true,
              message: "Please input your student name!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a student name" />
        </Form.Item>

        <Form.Item
          fieldProps={{ pattern: "^[0-9]{9}$" }}
          name="student_id"
          label="Student ID"
          rules={[
            {
              required: true,
              message: "Please input student id!",
            },
            {
              pattern: "^[0-9]{9}$",
              message: "Please enter a valid 9-digit student id!",
            },
          ]}
        >
          <Input size="large" placeholder="ex: 12020xxxx" />
        </Form.Item>

        <Form.Item label="Phone number">
          <Input.Group compact className="!flex">
            <Form.Item
              name={["phone_number", "prefix"]}
              noStyle
              initialValue={"059"}
            >
              <Select size="large">
                <Option value="059">059</Option>
                <Option value="056">056</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["phone_number", "phone"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: "^[0-9]{7}$",
                  message: "Please enter a valid 7-digit phone number.",
                },
              ]}
            >
              <Input size="large" placeholder="Enter a phone number" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Address">
          <Input.Group compact className="!flex">
            <Form.Item
              name={["address", "city"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "City is required",
                },
              ]}
            >
              <Select placeholder="Select City" size="large">
                <Option value="gaza">Gaza</Option>
                <Option value="alwustaa">Alwustaa</Option>
                <Option value="deir_albalah">Deir al Balah</Option>
                <Option value="khan_yunis">Khan Yunis</Option>
                <Option value="rafah">Rafah</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["address", "street"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Street is required",
                },
              ]}
            >
              <Input size="large" placeholder="Input street" />
            </Form.Item>
          </Input.Group>
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
          <Select
            placeholder="select Course"
            size="large"
            mode="multiple"
            style={{
              width: "100%",
            }}
            optionLabelProp="label"
          >
            <Option value="ECOM3401" label="DB">
              <Space>
                <span role="img" aria-label="DB" className="text-xs">
                  ECOM3401
                </span>
                DB
              </Space>
            </Option>
            <Option value="ECOM3302" label="Java 2">
              <Space>
                <span role="img" aria-label="Java 2" className="text-xs">
                  ECOM3302
                </span>
                Java 2
              </Space>
            </Option>
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

        <Form.Item className="">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudent;
