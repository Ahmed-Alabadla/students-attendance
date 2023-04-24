import { Form, Input, Select, Button } from "antd";
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

const AddInstructor = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();
  };

  return (
    <div className="bg-[#f5f5f5] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Add Instructor
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
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter an email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern: "^.{8,20}$",
              message:
                "Please enter a password between 8 and 20 characters long.",
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter a password" />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Enter a confirm password" />
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

        <Form.Item className="">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddInstructor;
