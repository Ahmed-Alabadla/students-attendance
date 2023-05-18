import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const data = [
  {
    id: "1",
    name: "Introduction to SQL",
    course: "DB",
    year: "2021-2022",
    semester: "first semester",
    percent_attendance: "89%",
  },
  {
    id: "2",
    name: "Introduction to Classes",
    course: "Java 1",
    year: "2020-2021",
    semester: "first semester",
    percent_attendance: "100%",
  },
  {
    id: "3",
    name: "Introduction to JavaFx",
    course: "Java 2",
    year: "2020-2021",
    semester: "second semester",
    percent_attendance: "80%",
  },
];
const Lectures = () => {
  const route = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      route("/login");
    }
  }, []);

  // -------------------
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
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year.localeCompare(b.year),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      sorter: (a, b) => a.semester.localeCompare(b.semester),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Percentage Attendance",
      dataIndex: "percent_attendance",
      key: "percent_attendance",
      sorter: (a, b) =>
        a.percent_attendance.localeCompare(b.percent_attendance),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: () => (
        <Button onClick={() => route("/record-attendance")}>Attendances</Button>
      ),
    },
  ];

  // ----------------------------
  const { Option } = Select;

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

  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    route("/record-attendance");
    form.resetFields();
  };

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Lectures
      </p>
      <div className="flex items-end flex-col">
        <Button
          type="primary"
          className="w-fit"
          onClick={() => setShowModal(true)}
        >
          Add Lecture
        </Button>
        <Table
          className="w-full mt-5"
          columns={columns}
          dataSource={data}
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
            x: 500,
          }}
        />
        {/* -------Modal------- */}
        <Modal
          open={showModal}
          onCancel={handleCancel}
          footer={[]}
          style={{
            top: 35,
          }}
        >
          <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
            Add Lecture
          </p>
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
              name="lecture_name"
              label="Lecture Name"
              rules={[
                {
                  required: true,
                  message: "Please input your lecture name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter a lecture name" />
            </Form.Item>

            <Form.Item
              name="courseID"
              label="Course ID"
              rules={[
                {
                  required: true,
                  message: "Please select course!",
                },
              ]}
            >
              <Select placeholder="select Course" size="large">
                <Option value="ECOM3401">DB</Option>
                <Option value="ECOM3302">Java 2</Option>
              </Select>
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
                <Option value="2023_2024">2023-2024</Option>
                <Option value="2022_2023">2022-2023</Option>
                <Option value="2021_2022">2021-2022</Option>
                <Option value="2020_2021">2020-2021</Option>
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
                <Option value="first_semester">First Semester</Option>
                <Option value="first_semester">Second Semester</Option>
                <Option value="summer_semester">Summer Semester</Option>
              </Select>
            </Form.Item>

            <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Add lecture
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Lectures;
