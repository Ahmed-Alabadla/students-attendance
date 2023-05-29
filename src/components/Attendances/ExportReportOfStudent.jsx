import { AutoComplete, Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Option } from "antd/es/mentions";

const ExportReportOfStudent = () => {
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
        span: 18,
      },
    },
  };

  const token = sessionStorage.getItem("token");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // api
    //   .post("lectures", values, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     toast.success(res.data.message, {
    //       position: "bottom-left",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //     form.resetFields();
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //     toast.error(err.response.data.message, {
    //       position: "bottom-left",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   });
    console.log("Received values of form: ", values);
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

  // -----------------list of student----------------
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    api
      .get("students", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudentData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [dataSource, setDataSource] = useState([]);

  const handleSearch = (value) => {
    const filteredStudents = studentData.filter((student) => {
      const { name, number } = student;
      return (
        name.toLowerCase().includes(value.toLowerCase()) ||
        number.toString().includes(value)
      );
    });
    setDataSource(filteredStudents);
  };
  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-14">
      <p className="text-2xl font-semibold text-center  text-[#008ECC]">
        Export report of student
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
          name="student_number"
          label="Student"
          rules={[
            {
              required: true,
              message: "Please input student number or name!",
            },
          ]}
        >
          <AutoComplete
            size="large"
            dataSource={dataSource.map((student) => ({
              value: student.number.toString(),
              text: `${student.number} - ${student.name}`,
            }))}
            onSearch={handleSearch}
            placeholder="Type a student name or number"
          />
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
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full "
          >
            export
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ExportReportOfStudent;
