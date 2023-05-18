import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const EditStudent = ({
  showModalEditStudent,
  setShowModalEditStudent,
  editDataStudent,
  setEditDataStudent,
  formEditStudent,
}) => {
  const onFinishEditStudent = (values) => {
    console.log("Received values of form: ", values);
    formEditStudent.resetFields();

    setShowModalEditStudent(false);
    setEditDataStudent(null);
  };

  const handleCancelEditStudent = () => {
    setShowModalEditStudent(false);
    setEditDataStudent(null);
    formEditStudent.resetFields();
  };

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
  return (
    <Modal
      open={showModalEditStudent}
      onCancel={handleCancelEditStudent}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Student
      </p>
      {editDataStudent && (
        <Form
          {...formItemLayout}
          form={formEditStudent}
          onFinish={onFinishEditStudent}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataStudent}
          scrollToFirstError
        >
          <Form.Item
            name="name"
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
            name="phone_number"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                max: 10,
                message: "Invalid phone number EX: [ 059xxxxxxx , 056xxxxxxx ]",
              },
              {
                min: 10,
                message: "Invalid phone number EX: [ 059xxxxxxx , 056xxxxxxx ]",
              },
            ]}
          >
            <Input size="large" placeholder="Enter a Phone number" />
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
                  <Option value="northern_gaza">Northern Gaza</Option>
                  <Option value="gaza">Gaza</Option>
                  <Option value="alwustaa">Alwustaa</Option>
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

          {/* <Form.Item
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
                    <Space>DB</Space>
                  </Option>
                  <Option value="ECOM3302" label="Java 2">
                    <Space>Java 2</Space>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="section"
                label="Section "
                rules={[
                  {
                    required: true,
                    message: "Please select section!",
                  },
                ]}
              >
                <Select placeholder="select Section " size="large">
                  <Option value="101">101</Option>
                  <Option value="102">102</Option>
                  <Option value="103">103</Option>
                  <Option value="104">104</Option>
                </Select>
              </Form.Item> */}

          <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full "
            >
              Edit student
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditStudent;
