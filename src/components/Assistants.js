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
    name: "Mohammed",
    course_name: "DB",
  },
  {
    id: "2",
    name: "Ahmed",
    course_name: "Java 1",
  },
  {
    id: "3",
    name: "Osama",
    course_name: "Java 2",
  },
];
const Assistants = () => {
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
      title: "Course name",
      dataIndex: "course_name",
      key: "course_name",
      width: "20%",
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
        Assistants
      </p>
      <div className="flex items-end flex-col">
        <Button
          type="primary"
          className="w-fit"
          onClick={() => setShowModal(true)}
        >
          Add Assistant
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
            Add Assistant
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
              name="fullname"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter a Full Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter an email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  pattern: "^.{8,20}$",
                  message:
                    "Please enter a password between 8 and 20 characters long.",
                },
              ]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="Enter a password" />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter a confirm password"
              />
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

            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full "
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Assistants;
