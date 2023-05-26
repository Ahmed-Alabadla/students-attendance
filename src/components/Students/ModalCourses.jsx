import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Form, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignCourseToStudent from "./AssignCourseToStudent";

const ModalCourses = ({
  modalCoursesForStudent,
  setModalCoursesForStudent,
}) => {
  const columnsForCourses = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // width: '5%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
      // fixed: "left",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClickEditCFS(record)}
            className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center"
          >
            <EditFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
          <button
            onClick={() => showDeleteConfirm(record)}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center"
          >
            <DeleteFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
      ),
    },
  ];
  const dataCourses = [
    {
      id: "1",
      course: "DB",
      section: "101",
    },
    {
      id: "2",
      course: "Java 1",
      section: "101",
    },
    {
      id: "3",
      course: "Java 2",
      section: "102",
    },
    {
      id: "4",
      course: "Logic design",
      section: "102",
    },
  ];

  // ---------------- Modal edit student -----------------
  const [showModalEditCFS, setShowModalEditCFS] = useState(false);
  const [editDataCFS, setEditDataCFS] = useState(null);

  const [formEditCFS] = Form.useForm();
  const onFinishEditCFS = (values) => {
    console.log("Received values of form: ", values);
    formEditCFS.resetFields();

    setShowModalEditCFS(false);
    setEditDataCFS(null);
  };

  const handleClickEditCFS = (record) => {
    formEditCFS.setFieldsValue(record);
    setShowModalEditCFS(true);
    setEditDataCFS(record);
  };
  const handleCancelEditCFS = () => {
    setShowModalEditCFS(false);
    setEditDataCFS(null);
    formEditCFS.resetFields();
  };

  // ---------------- Modal delete student -----------------
  const { confirm } = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: <p>Are you sure delete this course ({record.course})?</p>,
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      width: 550,
      onOk() {
        console.log("OK");

        toast.success("delete successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // ---------- Assign course -------------
  const [showModalAssignCourse, setShowModalAssignCourse] = useState(false);
  const [studentData_assign, setStudentData_assign] = useState({});

  const handleClickAssignCourse = () => {
    setShowModalAssignCourse(true);
  };

  return (
    <>
      <ToastContainer />

      {/* ----------assign course to student ----------- */}
      <AssignCourseToStudent
        showModalAssignCourse={showModalAssignCourse}
        setShowModalAssignCourse={setShowModalAssignCourse}
      />

      {/* ----------Show courses for student ----------- */}

      <Modal
        open={modalCoursesForStudent}
        onCancel={() => setModalCoursesForStudent(false)}
        footer={[]}
        style={{
          top: 35,
        }}
      >
        <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
          Courses for student
        </p>
        <div className="text-end">
          <Button onClick={() => setShowModalAssignCourse(true)}>
            Add course
          </Button>
        </div>

        <Table
          className="w-full mt-5"
          columns={columnsForCourses}
          dataSource={dataCourses}
          bordered
        />
      </Modal>

      {/* -------Modal courses for student------- */}
      <Modal
        open={showModalEditCFS}
        onCancel={handleCancelEditCFS}
        footer={[]}
        centered
      >
        <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
          Edit Student
        </p>
        {setEditDataCFS && (
          <Form
            form={formEditCFS}
            onFinish={onFinishEditCFS}
            className="mx-auto mt-8"
            style={{
              width: "100%",
              maxWidth: 700,
            }}
            initialValues={editDataCFS}
            scrollToFirstError
          >
            <Form.Item
              name="course"
              label="Course"
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
                style={{
                  width: "100%",
                }}
                optionLabelProp="label"
                disabled
              ></Select>
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
    </>
  );
};

export default ModalCourses;
