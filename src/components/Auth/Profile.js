import { LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const route = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      route("/login");
    }
  }, []);
  // ----------------------

  const handleSignOut = () => {
    if (token) {
      api
        .delete("logout", {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("lecture_id");
          sessionStorage.removeItem("name");
          route("/login");
        });
    }
  };

  // ---------------------------

  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setLoading(true);
    api
      .post("change-password", values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "X-HTTP-Method-Override": "PATCH",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setShowModal(false);
        form.resetFields();
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
      })
      .catch((err) => {
        setLoading(false);
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
    console.log("Received values of form: ", values);
  };

  const validatePassword = (_, value, callback) => {
    const { getFieldValue } = form;

    if (value && value !== getFieldValue("new_password")) {
      callback("The two passwords that you entered do not match!");
    } else {
      callback();
    }
  };

  const user = useSelector((state) => state.userDetails.user);
  return (
    <div className="">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Your Profile
      </p>
      <div className="container flex flex-col gap-5 items-end mt-12">
        <Button
          className="flex items-center w-fit "
          shape="round"
          icon={<LogoutOutlined />}
          danger
          onClick={handleSignOut}
        >
          Sign out
        </Button>
        <div className="flex flex-col gap-7 w-full">
          <div className="relative w-full">
            <input
              name="email"
              type="email"
              id="labelEmail"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
              value={user.email}
              readOnly
            />
            <label
              for="labelEmail"
              className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="relative flex items-center ">
            <div className="w-full">
              <input
                name="name"
                type="text"
                id="labelName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
                value={user.name}
                readOnly
              />
              <label
                for="labelName"
                className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Your Name
              </label>
            </div>

            {/* <button
              type="button"
              className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ml-5 sm:ml-10"
            >
              Change
            </button> */}
          </div>

          <div className="relative flex items-center">
            <div className="w-full">
              <input
                name="password"
                type="text"
                id="labelPassword"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg ring-1 ring-slate-200 appearance-none  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer "
                value="********"
                readOnly
              />
              <label
                for="labelPassword"
                className="absolute text-sm  rounded-lg text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ml-5 sm:ml-10"
            >
              Change
            </button>
            {/* -------Modal------- */}
            <Modal open={showModal} onCancel={handleCancel} footer={[]}>
              <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
                Change Password
              </p>
              <Form
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
                  className="!mb-6"
                  name="current_password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your current password!",
                    },
                    {
                      min: 8,
                      message:
                        "Current password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Current password"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  className="!mb-6"
                  name="new_password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                    {
                      min: 8,
                      message:
                        "New password must be at least 8 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="New password"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  className="!mb-6"
                  name="confirm_password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirm password!",
                    },
                    {
                      min: 8,
                      message:
                        "Confirm password must be at least 8 characters long",
                    },
                    { validator: validatePassword },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="!mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full "
                    loading={loading}
                  >
                    {loading ? "loading . . ." : "Save"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
