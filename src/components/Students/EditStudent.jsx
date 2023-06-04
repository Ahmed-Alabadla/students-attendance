import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudent = ({
  showModalEditStudent,
  setShowModalEditStudent,
  editDataStudent,
  setEditDataStudent,
  formEditStudent,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditStudent = (values) => {
    const data = {
      name: values.name,
      phone: values.phone,
      address: values.address.city + " - " + values.address.street,
    };
    api
      .post(`students/${editDataStudent.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-HTTP-Method-Override": "PUT",
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
        setTableData((prev) => {
          const updatedDataSource = prev.filter(
            (instructor) => instructor.id !== res.data.data.id
          );
          return [...updatedDataSource, res.data.data];
        });
        formEditStudent.resetFields();

        setShowModalEditStudent(false);
        setEditDataStudent(null);
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
            name="phone"
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
              Edit student
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditStudent;
