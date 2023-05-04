import { Button, Form, Input, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import QRScanner from "./QRScanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";
import ImportAttendance from "./ImportAttendance";

const RecordAttendance = () => {
  const token = localStorage.getItem("token");

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
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();
    await api
      .post(
        "attendances",
        { student_number: values.student_number, section_id: 26 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.message} - ${values.student_number}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <Tabs defaultActiveKey="1" centered tabStyle={{ fontWeight: "bold" }}>
      <TabPane tab="QR Scanner" key="1">
        <QRScanner />
      </TabPane>
      <TabPane tab="Form" key="2">
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
            fieldProps={{ pattern: "^[0-9]{9}$" }}
            name="student_number"
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

          <Form.Item className="">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full "
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <ToastContainer />
      </TabPane>
      <TabPane tab="Import Data" key="3">
        <ImportAttendance />
      </TabPane>
    </Tabs>
  );
};

export default RecordAttendance;
