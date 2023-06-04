import { Button, Form, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

import * as XLSX from "xlsx";

const { Option } = Select;

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

const Attendances = () => {
  const route = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      route("/login");
    }
  }, []);
  // ----------------------

  const columns = [
    {
      title: "Student number",
      dataIndex: "student_number",
      key: "student_number",
    },
    {
      title: "Attendance count",
      dataIndex: "attendance_count",
      key: "attendance_count",
    },
    {
      title: "Attendance Ratio",
      dataIndex: "ratio",
      render: (text, record) => (
        <span>
          {((record.attendance_count * 100) / numberOfLectures).toFixed(2)}
        </span>
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

  // ----------courses------------------
  const token = sessionStorage.getItem("token");

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
  // ---------- section list ------------
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

  // --------------reports list --------------------
  const [showReports, setShowReports] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [reportsData, setReportsData] = useState({});
  const [numberOfLectures, setNumberOfLectures] = useState();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setReportsData({
      course_id: values.course_id,
      section_id: values.section_id,
      semester: values.semester,
      year: values.year,
    });
    api
      .post("report", values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-HTTP-Method-Override": "GET",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.students);
        setTableData(res.data.data.students);
        setNumberOfLectures(res.data.data.numberOfLectures);
        setShowReports(true);
        form.resetFields();
      });
  };

  // ----------------------------------

  const handleClickExportReports = async () => {
    await api
      .post("export-report", reportsData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-HTTP-Method-Override": "GET",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        convertToExcel(res.data);
      });
  };
  const convertToExcel = (data) => {
    const lines = data.trim().split("\n");
    const title = lines[0].split("\t");
    const year = lines[1].split("\t");
    const semester = lines[2].split("\t");
    const lectures = lines[3].split("\t");

    const rows = lines.slice(4).map((line) => line.split("\t"));

    const worksheet = XLSX.utils.aoa_to_sheet([
      title,
      year,
      semester,
      lectures,
      ...rows,
    ]);
    // Set the width of the first column based on the width of the first row
    const firstRowWidths = title.map((header) => ({ wch: header.length }));
    worksheet["!cols"] = firstRowWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "report.xlsx";
    link.click();
  };
  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Reports
      </p>
      <div className="flex items-end flex-col">
        {showReports ? (
          <>
            <div className="flex items-center justify-between w-full">
              <p>number of Lectures : {numberOfLectures}</p>
              <Button
                type="primary"
                className="w-fit"
                onClick={handleClickExportReports}
              >
                Export report
              </Button>
            </div>
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
              scroll={{
                x: 300,
              }}
            />
          </>
        ) : (
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

            <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Show reports
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Attendances;
