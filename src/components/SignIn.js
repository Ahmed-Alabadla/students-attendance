import React from "react";
import { LockOutlined } from "@ant-design/icons";
import { HiOutlineMail } from "react-icons/hi";
import { Button, Form, Input, Modal } from "antd";

const info = () => {
  Modal.info({
    title: "Forgot password",
    theme: "light",
    content: (
      <div>
        <p>if you Forget password</p>
        <p>Please contact the manger to change the password </p>
      </div>
    ),
    onOk() {},
  });
};

const SignIn = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div className="bg-[#f4f8f9] h-screen flex justify-center">
        <div className="flex flex-col justify-center items-center m-auto w-80 sm:w-[500px]  p-7 bg-gray-50 rounded-lg shadow-xl">
          <p className="text-2xl font-semibold text-slate-500 mb-10">
            Sign in to your account
          </p>
          <Form
            name="normal_login"
            className="login-form w-full"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              className="mb-10"
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
              <Input
                prefix={<HiOutlineMail className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="!mb-3"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button className="login-form-forgot" type="link" onClick={info}>
                Forgot password
              </Button>
            </Form.Item>

            <Form.Item className="!h-10 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full text-lg text-center h-full"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default SignIn;
