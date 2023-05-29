import { Button, Form, Input, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Student number",
      dataIndex: "student_number",
      key: "student_number",
      width: "20%",
    },

    {
      title: "Total Attendance",
      dataIndex: "total_attendance",
      key: "total_attendance",
    },
    {
      title: "Percentage Attendance",
      dataIndex: "percent_attendance",
      key: "percent_attendance",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: () => <Button>Details</Button>,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // ----------courses------------------
  const token = sessionStorage.getItem("token");

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
        console.log(res.data.data.students);
        setTableData(res.data.data.students);
        setNumberOfLectures(res.data.data.numberOfLectures);
        setShowReports(true);
        form.resetFields();
      });
  };

  const handleClickExportReports = () => {
    api
      .post("export-report", reportsData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-HTTP-Method-Override": "GET",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
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
              loading={loading}
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
              <Select placeholder="select Course" size="large">
                {coursesList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.title}
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
