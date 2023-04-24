import React, { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { HiOutlineMail } from "react-icons/hi";
import { Button, Form, Input, Modal, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import api from "./api";
import { useNavigate } from "react-router-dom";

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
  const route = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route("/");
    }
  }, []);

  // --------------form_assistant------------------
  const [form_assistant] = Form.useForm();
  const [loadingAssistant, setLoadingAssistant] = useState(false);
  const [errorAssistant, setErrorAssistant] = useState(false);

  const login_assistant = (values) => {
    setLoadingAssistant(true);
    const data = { ...values, type: "assistant" };
    // console.log("Received values of form -- assistant: ", data);

    api
      .post("login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
        setLoadingAssistant(false);
        setErrorAssistant(false);
        form_assistant.resetFields();
        route("/");
      })
      .catch((err) => {
        setLoadingAssistant(false);
        setErrorAssistant(true);
      });
  };

  // ------------form_instructor--------------------
  const [form_instructor] = Form.useForm();
  const [loadingInstructor, setLoadingInstructor] = useState(false);
  const [errorInstructor, setErrorInstructor] = useState(false);

  const login_instructor = (values) => {
    const data = { ...values, type: "instructor" };
    // console.log("Received values of form -- instructor: ", data);
    api
      .post("login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
        setLoadingInstructor(false);
        setErrorInstructor(false);
        form_instructor.resetFields();
        route("/");
      })
      .catch((err) => {
        setLoadingInstructor(false);
        setErrorInstructor(true);
      });
  };

  // -----------form_admin------------------
  const [form_admin] = Form.useForm();
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [errorAdmin, setErrorAdmin] = useState(false);

  const login_admin = (values) => {
    const data = { ...values, type: "admin" };
    // console.log("Received values of form -- admin: ", data);

    api
      .post("login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
        setLoadingAdmin(false);
        setErrorAdmin(false);
        form_admin.resetFields();
        route("/");
      })
      .catch((err) => {
        setLoadingAdmin(false);
        setErrorAdmin(true);
      });
  };

  return (
    <>
      <div className="bg-[#f4f8f9] h-screen flex justify-center">
        <div className="flex flex-col justify-center items-center m-auto w-80 sm:w-[500px]  p-7 bg-gray-50 rounded-lg shadow-xl">
          <p className="text-2xl font-semibold text-slate-500 mb-5">
            Sign in to your account
          </p>

          <Tabs defaultActiveKey="1" centered className="w-full">
            {/* -------assistant------- */}
            <TabPane tab="Assistant" key="1">
              {errorAssistant && (
                <div className="flex items-center justify-center w-full my-5 p-2.5 rounded-lg text-white bg-red-500 text-base">
                  Incorrect email or password.
                </div>
              )}
              <Form
                form={form_assistant}
                name="normal_login"
                className="login-form w-full mt-3"
                onFinish={login_assistant}
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
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                <Form.Item className="flex justify-end !mb-5">
                  <Button
                    className="login-form-forgot"
                    type="link"
                    onClick={info}
                  >
                    Forgot password
                  </Button>
                </Form.Item>

                <Form.Item className="!h-10 !mb-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-full text-lg text-center h-full"
                    loading={loadingAssistant}
                  >
                    {loadingAssistant ? "loading . . ." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            {/* ------Instructor------- */}
            <TabPane tab="Instructor" key="2">
              {errorInstructor && (
                <div className="flex items-center justify-center w-full my-5 p-2.5 rounded-lg text-white bg-red-500 text-base">
                  Incorrect email or password.
                </div>
              )}
              <Form
                form={form_instructor}
                name="normal_login"
                className="login-form w-full mt-3"
                onFinish={login_instructor}
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
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
                <Form.Item className="flex justify-end !mb-5">
                  <Button
                    className="login-form-forgot"
                    type="link"
                    onClick={info}
                  >
                    Forgot password
                  </Button>
                </Form.Item>

                <Form.Item className="!h-10 !mb-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-full text-lg text-center h-full"
                    loading={loadingInstructor}
                  >
                    {loadingInstructor ? "loading . . ." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            {/* ---------Admin--------- */}
            <TabPane tab="Admin" key="3">
              {errorAdmin && (
                <div className="flex items-center justify-center w-full my-5 p-2.5 rounded-lg text-white bg-red-500 text-base">
                  Incorrect email or password.
                </div>
              )}
              <Form
                form={form_admin}
                name="normal_login"
                className="login-form w-full mt-3"
                onFinish={login_admin}
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
                  className=""
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="!h-10 !mb-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-full text-lg text-center h-full"
                    loading={loadingAdmin}
                  >
                    {loadingAdmin ? "loading . . ." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default SignIn;
