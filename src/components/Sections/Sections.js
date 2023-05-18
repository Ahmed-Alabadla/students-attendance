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
import api from "../api";
import AddSection from "./AddSection";
import { ToastContainer } from "react-toastify";

const data = [
  {
    id: "1",
    section: "101",
    course: "DB",
    total_student: "20",
  },
  {
    id: "2",
    section: "102",
    course: "DB",
    total_student: "30",
  },
  {
    id: "3",
    section: "103",
    course: "DB",
    total_student: "25",
  },
  {
    id: "4",
    section: "101",
    course: "Java 1",
    total_student: "40",
  },
  {
    id: "5",
    section: "102",
    course: "Java 1",
    total_student: "40",
  },
];
const Sections = () => {
  const route = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
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
      title: "Section number",
      dataIndex: "number",
      key: "number",
      // width: "20%",
      ...getColumnSearchProps("number"),
    },
    {
      title: "Course",
      dataIndex: "course_id",
      key: "course_id",
      sorter: (a, b) => a.course_id - b.course_id,
      // sorter: (a, b) => a.course_id.localeCompare(b.course_id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      render: (text) => (
        <>
          {text === "first" && "First semester"}
          {text === "second" && "Second semester"}
          {text === "summer" && "Summer semester"}
        </>
      ),
    },
    {
      title: "Total Student",
      dataIndex: "total_student",
      key: "total_student",
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

  const [showModal, setShowModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      api
        .get("sections", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTableData(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
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
            x: 500,
          }}
        />
        <ToastContainer />
        {/* -------Modal------- */}
        <AddSection
          showModal={showModal}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />
      </div>
    </div>
  );
};

export default Sections;
