import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EyeFilled,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const data = [
  {
    id: "1",
    name: "DB",
    year: "2021-2022",
    semester: "first semester",
    percent_attendance: "89%",
  },
  {
    id: "2",
    name: "Java 1",
    year: "2020-2021",
    semester: "first semester",
    percent_attendance: "100%",
  },
  {
    id: "3",
    name: "Java 2",
    year: "2020-2021",
    semester: "second semester",
    percent_attendance: "80%",
  },
];
const Sections = () => {
  const route = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
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
      width: "25%",
      ...getColumnSearchProps("name"),
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

  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Sections
      </p>
      <div className="flex items-end flex-col">
        <Button
          type="primary"
          className="w-fit"
          onClick={() => setShowModal(true)}
        >
          Add Section
        </Button>
        <Table
          className="w-full mt-5"
          columns={columns}
          dataSource={data}
          bordered
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
            Add Section
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
              name="section_name"
              label="Section Name"
              rules={[
                {
                  required: true,
                  message: "Please input your section name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter a section name" />
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
              name="room_number"
              label="Room Number"
              rules={[
                {
                  required: true,
                  message: "Please select room_number!",
                },
              ]}
            >
              <Select placeholder="select Room Number" size="large">
                <Option value="room1">Room 1</Option>
                <Option value="room2">Room 2</Option>
                <Option value="room3">Room 3</Option>
                <Option value="room4">Room 4</Option>
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

            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Add Section
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Sections;
