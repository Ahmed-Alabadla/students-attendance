import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

const AddInstructor = ({ showModalAdd, setShowModalAdd, setTableData }) => {
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
  const token = sessionStorage.getItem("token");

  const [formAdd] = Form.useForm();
  const onFinish = (values) => {
    const data = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      phone: values.phone_number.prefix + values.phone_number.phone,
    };

    api
      .post("instructors", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
        formAdd.resetFields();
        setTableData((prev) => {
          return [...prev, res.data.data];
        });
        setShowModalAdd(false);
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("Email has already been taken", {
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
  return (
    <Modal
      open={showModalAdd}
      onCancel={() => {
        setShowModalAdd(false);
        formAdd.resetFields();
      }}
      footer={[]}
      style={{
        top: 35,
      }}
      width={550}
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Add Instructor
      </p>
      <Form
        {...formItemLayout}
        form={formAdd}
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
          label="Name"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input size="large" placeholder="Enter a first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input size="large" placeholder="Enter a last name" />
          </Form.Item>
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

        {/* <Form.Item
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
        </Form.Item> */}

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

export default AddInstructor;
