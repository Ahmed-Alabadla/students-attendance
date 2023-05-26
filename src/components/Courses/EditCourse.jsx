import { Button, Form, Input, Modal } from "antd";
import React from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = ({
  showModalEditCourse,
  setShowModalEditCourse,
  editDataCourse,
  setEditDataCourse,
  formEditCourse,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditCourse = (values) => {
    // console.log("Received values of form: ", values);
    api
      .post(`courses/${editDataCourse.id}`, values, {
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
        formEditCourse.resetFields();

        setShowModalEditCourse(false);
        setEditDataCourse(null);
      })
      .catch((err) => {
        console.log(err);
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

  const handleCancelEditCourse = () => {
    setShowModalEditCourse(false);
    setEditDataCourse(null);
    formEditCourse.resetFields();
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 19,
      },
    },
  };
  return (
    <Modal
      open={showModalEditCourse}
      onCancel={handleCancelEditCourse}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Course
      </p>
      {editDataCourse && (
        <Form
          {...formItemLayout}
          form={formEditCourse}
          onFinish={onFinishEditCourse}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataCourse}
          scrollToFirstError
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your  title!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter a title" />
          </Form.Item>
          <Form.Item
            name="book"
            label="Book"
            rules={[
              {
                required: true,
                message: "Please input your  book!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter a book" />
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

export default EditCourse;
