import { Button, Form, Input, Modal } from "antd";
import React from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAssistant = ({
  showModalEditAssistant,
  setShowModalEditAssistant,
  editDataAssistant,
  setEditDataAssistant,
  formEditAssistant,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditAssistant = (values) => {
    // console.log("Received values of form: ", values);
    api
      .post(`assistants/${editDataAssistant.id}`, values, {
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
        formEditAssistant.resetFields();

        setShowModalEditAssistant(false);
        setEditDataAssistant(null);
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

  const handleCancelEditAssistant = () => {
    setShowModalEditAssistant(false);
    setEditDataAssistant(null);
    formEditAssistant.resetFields();
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
      open={showModalEditAssistant}
      onCancel={handleCancelEditAssistant}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Assistant
      </p>
      {editDataAssistant && (
        <Form
          {...formItemLayout}
          form={formEditAssistant}
          onFinish={onFinishEditAssistant}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataAssistant}
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

export default EditAssistant;
