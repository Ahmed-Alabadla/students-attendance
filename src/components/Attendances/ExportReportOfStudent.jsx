import { AutoComplete, Button, Form, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api";
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
  const columns = [
    {
      title: "Lecture ID",
      dataIndex: "lecture_id",
      key: "lecture_id",
    },
    {
      title: "Lecture Name",
      dataIndex: "lecture_id",
      key: "lecture_id",
      render: (text) => <>{getLectureNameByID(text)}</>,
    },
    // {
    //   title: "Lecture name",
    //   dataIndex: "lecture_name",
    //   key: "lecture_name",
    //   render: (text, record) => <>{getLectureNameByID(record.lecture_id)}</>,
    // },
    {
      title: "Attendance",
      dataIndex: "is_attendance",
      key: "is_attendance",
      render: (text) => (
        <>
          {text === 0 && <Tag color="#f50">NO</Tag>}
          {text === 1 && <Tag color="#87d068">YES</Tag>}
        </>
      ),
    },
  ];
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  // ------------------------------
  const token = sessionStorage.getItem("token");
  const [showReport, setShowReport] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    setLectureData({
      course_id: values.course_id,
      section_id: values.section_id,
      year: values.year,
      semester: values.semester,
    });
    api
      .get(
        `studentReport?course_id=${values.course_id}&semester=${values.semester}&year=${values.year}&student_number=${values.student_number}&section_id=${values.section_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTableData(res.data.data);
        setShowReport(true);
        form.resetFields();
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log("Received values of form: ", values);
  };

  // ----------Lectures------------------
  const [lectureData, setLectureData] = useState({});

  const [lectureList, setLectureList] = useState([]);
  useEffect(() => {
    if (token) {
      api
        .post("lectures", lectureData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-HTTP-Method-Override": "GET",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLectureList(res.data.data);
        });
    }
  }, [token]);

  function getLectureNameByID(id) {
    for (let i = 0; i < lectureList.length; i++) {
      if (lectureList[i].id === id) {
        return lectureList[i].name;
      }
    }
    return null; // Return null if the section_name is not found
  }
  // ----------courses------------------

  const [coursesList, setCoursesList] = useState([]);
  const assistant_id = sessionStorage.getItem("assistant_id");
  useEffect(() => {
    if (token) {
      api
        .get(`courses?assistant_id=${assistant_id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCoursesList(res.data.data);
        })
        .catch();
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
        .catch();
    }
  }, [course_id, token]);

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
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-12">
      <p className="text-2xl font-semibold text-center  text-[#008ECC]">
        Export report of student
      </p>
      {showReport ? (
        <Table
          className="w-full mt-5"
          columns={columns}
          dataSource={tableData}
          bordered
          pagination={{
            pageSize: pageSize,
            // showSizeChanger: true,
            showSizeChanger: true,
            current: currentPage,
            onChange: handlePageChange, // Handle page change event
            onShowSizeChange: handlePageChange, // Handle page size change event
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      ) : (
        <Form
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
          className="mx-auto mt-4"
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

          {/* {showInputSection && (
                )} */}
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
            <Select
              // disabled={!showInputSection}
              placeholder="select Section "
              size="large"
            >
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
              export
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ExportReportOfStudent;
