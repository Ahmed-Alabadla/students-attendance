import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import dayjs from "dayjs";

const AddRoom = ({ showModal, setShowModal, setTableData }) => {
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
    api
      .post("rooms", values, {
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
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Add Room
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
          name="building"
          label="Building"
          rules={[
            {
              required: true,
              message: "Please input your building!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a building" />
        </Form.Item>
        <Form.Item
          name="number"
          label="Room number"
          rules={[
            {
              required: true,
              message: "Please input your room number!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter a room number" />
        </Form.Item>

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Add Room
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoom;
