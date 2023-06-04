import { AutoComplete, Button, Form, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import QRScanner from "./QRScanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import ImportAttendance from "./ImportAttendance";
import { useSelector } from "react-redux";

const RecordAttendance = () => {
  const token = sessionStorage.getItem("token");

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

  const { lecture_id } = useSelector((state) => state.lecture);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    form.resetFields();
    await api
      .post(
        "attendances",
        { student_number: values.student_number, lecture_id: lecture_id.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success(`${res.data.message} - ${values.student_number}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

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
      });
    // .catch((err) => console.log(err));
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
    <>
      <p className="text-lg">
        lecture name : <span className="text-[#008ECC]">{lecture_id.name}</span>
      </p>
      <Tabs defaultActiveKey="1" centered tabStyle={{ fontWeight: "bold" }}>
        <TabPane tab="QR Scanner" key="1">
          <QRScanner />
        </TabPane>
        <TabPane tab="Form" key="2">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="mx-auto"
            style={{
              width: "100%",
              maxWidth: 700,
            }}
            scrollToFirstError
          >
            <Form.Item
              // fieldProps={{ pattern: "^[0-9]{9}$" }}
              name="student_number"
              label="Student"
              rules={[
                {
                  required: true,
                  message: "Please input student number or name!",
                },
                // {
                //   pattern: "^[0-9]{9}$",
                //   message: "Please enter a valid 9-digit student number!",
                // },
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
              {/* <Input size="large" placeholder="ex: 12020xxxx" /> */}
            </Form.Item>

            <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <ToastContainer />
        </TabPane>
        <TabPane tab="Import Data" key="3">
          <ImportAttendance />
        </TabPane>
      </Tabs>
    </>
  );
};

export default RecordAttendance;
