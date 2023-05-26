import { Button, Form, Input, Modal } from "antd";
import React from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditInstructor = ({
  showModalEditInstructor,
  setShowModalEditInstructor,
  editDataInstructor,
  setEditDataInstructor,
  formEditInstructor,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditInstructor = (values) => {
    // console.log("Received values of form: ", values);
    api
      .post(`instructors/${editDataInstructor.id}`, values, {
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
        formEditInstructor.resetFields();

        setShowModalEditInstructor(false);
        setEditDataInstructor(null);
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

  const handleCancelEditInstructor = () => {
    setShowModalEditInstructor(false);
    setEditDataInstructor(null);
    formEditInstructor.resetFields();
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
  return (
    <Modal
      open={showModalEditInstructor}
      onCancel={handleCancelEditInstructor}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Instructor
      </p>
      {editDataInstructor && (
        <Form
          {...formItemLayout}
          form={formEditInstructor}
          onFinish={onFinishEditInstructor}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataInstructor}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your  name!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter a  name" />
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

export default EditInstructor;
