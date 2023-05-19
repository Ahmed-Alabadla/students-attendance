import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const AssignCourseToStudent = ({
  showModalAssignCourse,
  setShowModalAssignCourse,
  student_number,
}) => {
  // ----------------------------
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const token = sessionStorage.getItem("token");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    const data = {
      student_number: student_number,
      course_id: values.course_id,
      semester: values.semester,
      year: `${values.year.$y}-${values.year.$y + 1}`,
      section_id: values.section_id,
    };
    api
      .post("takes", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
        form.resetFields();
        setShowModalAssignCourse(false);
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
    // console.log("Received values of form: ", data);
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

  // ----------Sections in course------------------

  const [sectionList, setSectionList] = useState([]);
  const [course_id, setCourse_id] = useState();
  useEffect(() => {
    if (token) {
      api
        .get(`sections?course_id=${course_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSectionList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [course_id, token]);

  return (
    <Modal
      open={showModalAssignCourse}
      onCancel={() => {
        setShowModalAssignCourse(false);
        form.resetFields();
      }}
      footer={[]}
      style={{
        top: 35,
      }}
    >
      <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
        Assign course
      </p>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        className="mx-auto mt-8"
        style={{
          width: "100%",
          maxWidth: 700,
        }}
        scrollToFirstError
      >
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
          <Select
            placeholder="select Course"
            size="large"
            onChange={(value) => setCourse_id(value)}
          >
            {coursesList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="section_id"
          label="Section "
          rules={[
            {
              required: true,
              message: "Please select section!",
            },
          ]}
        >
          <Select placeholder="select Section " size="large">
            {sectionList.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.number}
              </Option>
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
          <DatePicker
            // onChange={(ev) => console.log(ev.$y)}
            picker="year"
            disabledDate={disabledDate}
            size="large"
            className="w-full"
          />
        </Form.Item>

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            Assign
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignCourseToStudent;