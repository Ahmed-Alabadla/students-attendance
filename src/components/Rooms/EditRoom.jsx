import { Button, Form, Input, Modal } from "antd";
import React from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRoom = ({
  showModalEditRoom,
  setShowModalEditRoom,
  editDataRoom,
  setEditDataRoom,
  formEditRoom,
  setTableData,
}) => {
  const token = sessionStorage.getItem("token");

  const onFinishEditRoom = (values) => {
    // console.log("Received values of form: ", values);
    api
      .post(`rooms/${editDataRoom.id}`, values, {
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
        formEditRoom.resetFields();

        setShowModalEditRoom(false);
        setEditDataRoom(null);
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

  const handleCancelEditRoom = () => {
    setShowModalEditRoom(false);
    setEditDataRoom(null);
    formEditRoom.resetFields();
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
      open={showModalEditRoom}
      onCancel={handleCancelEditRoom}
      footer={[]}
      centered
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Edit Room
      </p>
      {editDataRoom && (
        <Form
          {...formItemLayout}
          form={formEditRoom}
          onFinish={onFinishEditRoom}
          className="mx-auto mt-8"
          style={{
            width: "100%",
            maxWidth: 700,
          }}
          initialValues={editDataRoom}
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
              Edit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditRoom;
