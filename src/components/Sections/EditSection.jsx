import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Option } from "antd/es/mentions";

const EditSection = ({
  showModalEditSection,
  setShowModalEditSection,
  editDataSection,
  setEditDataSection,
  formEditSection,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditSection = (values) => {
    // console.log("Received values of form: ", values);
    api
      .post(`sections/${editDataSection.id}`, values, {
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
        formEditSection.resetFields();

        setShowModalEditSection(false);
        setEditDataSection(null);
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
  };

  const handleCancelEditSection = () => {
    setShowModalEditSection(false);
    setEditDataSection(null);
    formEditSection.resetFields();
  };

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

  // ----------courses------------------

  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    if (token) {
      api
        .get("courses", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCoursesList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <Modal
      open={showModalEditSection}
      onCancel={handleCancelEditSection}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Section
      </p>
      {editDataSection && (
        <Form
          {...formItemLayout}
          form={formEditSection}
          onFinish={onFinishEditSection}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataSection}
          scrollToFirstError
        >
          <Form.Item
            name="number"
            label="Section nubmer"
            rules={[
              {
                required: true,
                message: "Please input your section number!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter a section number" />
          </Form.Item>

          <Form.Item
            name="course_id"
            label="Course "
            rules={[
              {
                required: true,
                message: "Please select course!",
              },
            ]}
          >
            <Select placeholder="select Course" size="large">
              {coursesList.map((item) => (
                <Option value={item.id}>{item.title}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="semester"
            label="Semester"
            rules={[
              {
                required: true,
                message: "Please select semester!",
              },
            ]}
          >
            <Select placeholder="select semester" size="large">
              <Option value="first">First Semester</Option>
              <Option value="second">Second Semester</Option>
              <Option value="summer">Summer Semester</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="year"
            label="Year"
            rules={[
              {
                required: true,
                message: "Please select year!",
              },
            ]}
          >
            <Select placeholder="select year" size="large">
              <Option value="2020-2021">2020-2021</Option>
              <Option value="2021-2022">2021-2022</Option>
              <Option value="2022-2023">2022-2023</Option>
              <Option value="2023-2024">2023-2024</Option>
              <Option value="2024-2025">2024-2025</Option>
              <Option value="2025-2026">2025-2026</Option>
              <Option value="2026-2027">2026-2027</Option>
              <Option value="2027-2028">2027-2028</Option>
              <Option value="2028-2029">2028-2029</Option>
              <Option value="2029-2030">2029-2030</Option>
            </Select>
          </Form.Item>
          <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full "
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditSection;
