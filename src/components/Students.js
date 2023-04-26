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
    name: "Ahmed",
    number: "120200956",
  },
  {
    id: "2",
    name: "Ali",
    number: "120200383",
  },
  {
    id: "3",
    name: "Mohammed",
    number: "120200370",
  },
];
const Students = () => {
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
      title: "Student number",
      dataIndex: "number",
      key: "number",
      width: "25%",
    },

    {
      title: "Courses",
      key: "add_course",
      render: () => <Button>Add course</Button>,
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: () => (
        <div className="flex gap-2">
          <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center">
            <EyeFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
          <button className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center">
            <EditFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
          <button className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center">
            <DeleteFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
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
    form.resetFields();
  };

  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center mt-3 text-[#008ECC]">
        Students
      </p>
      <div className="flex items-end flex-col">
        <Button
          type="primary"
          className="w-fit"
          onClick={() => setShowModal(true)}
        >
          Add Student
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
            Add student
          </p>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="mx-auto"
            initialValues={{
              prefix: "059",
            }}
            style={{
              width: "100%",
              maxWidth: 700,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="student_name"
              label="Student Name"
              rules={[
                {
                  required: true,
                  message: "Please input your student name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter a student name" />
            </Form.Item>

            <Form.Item
              fieldProps={{ pattern: "^[0-9]{9}$" }}
              name="student_number"
              label="Student Number"
              rules={[
                {
                  required: true,
                  message: "Please input student number!",
                },
                {
                  pattern: "^[0-9]{9}$",
                  message: "Please enter a valid 9-digit student number!",
                },
              ]}
            >
              <Input size="large" placeholder="ex: 12020xxxx" />
            </Form.Item>

            <Form.Item label="Phone number">
              <Input.Group compact className="!flex">
                <Form.Item
                  name={["phone_number", "prefix"]}
                  noStyle
                  initialValue={"059"}
                >
                  <Select size="large">
                    <Option value="059">059</Option>
                    <Option value="056">056</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["phone_number", "phone"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: "^[0-9]{7}$",
                      message: "Please enter a valid 7-digit phone number.",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter a phone number" />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item label="Address">
              <Input.Group compact className="!flex">
                <Form.Item
                  name={["address", "city"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "City is required",
                    },
                  ]}
                >
                  <Select placeholder="Select City" size="large">
                    <Option value="northern_gaza">Northern Gaza</Option>
                    <Option value="gaza">Gaza</Option>
                    <Option value="alwustaa">Alwustaa</Option>
                    <Option value="khan_yunis">Khan Yunis</Option>
                    <Option value="rafah">Rafah</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["address", "street"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Street is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Input street" />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* <Form.Item
              name="courseID"
              label="Course ID"
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
                mode="multiple"
                style={{
                  width: "100%",
                }}
                optionLabelProp="label"
              >
                <Option value="ECOM3401" label="DB">
                  <Space>
                    <span role="img" aria-label="DB" className="text-xs">
                      ECOM3401
                    </span>
                    DB
                  </Space>
                </Option>
                <Option value="ECOM3302" label="Java 2">
                  <Space>
                    <span role="img" aria-label="Java 2" className="text-xs">
                      ECOM3302
                    </span>
                    Java 2
                  </Space>
                </Option>
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
            </Form.Item> */}

            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Add Student
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Students;
