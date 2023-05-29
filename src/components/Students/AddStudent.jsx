import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

const AddStudent = ({ showModal, setShowModal, setTableData }) => {
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
        span: 17,
      },
    },
  };

  const token = sessionStorage.getItem("token");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    const data = {
      name: values.firstName + " " + values.lastName,
      number: values.number,
      email: values.email,
      phone: values.phone_number.prefix + values.phone_number.phone,
      address: values.address.city + " - " + values.address.street,
    };

    console.log(data);
    api
      .post("students", data, {
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
      width={550}
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Add student
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
          fieldProps={{ pattern: "^[0-9]{9}$" }}
          name="number"
          label="Student Number"
          rules={[
            {
              required: true,
              message: "Please input student number!",
            },
            {
              pattern: "^[0-9]{9}$",
              message: "Please enter a valid 9-digit student number!",
            },
          ]}
        >
          <Input size="large" placeholder="ex: 12020xxxx" />
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
                <Option value="Northern Gaza">Northern Gaza</Option>
                <Option value="Gaza">Gaza</Option>
                <Option value="Alwustaa">Alwustaa</Option>
                <Option value="Khan Yunis">Khan Yunis</Option>
                <Option value="Rafah">Rafah</Option>
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

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
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
    </Modal>
  );
};

export default AddStudent;
