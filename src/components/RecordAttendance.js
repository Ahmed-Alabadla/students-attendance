import { Button, Form, Input, Select, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import QRScanner from "./QRScanner";

const RecordAttendance = () => {
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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();
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
      </TabPane>
      <TabPane tab="Export Data" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default RecordAttendance;
