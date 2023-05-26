import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AddLecture from "./AddLecture";
import { ToastContainer } from "react-toastify";
import { setLectureId } from "../../redux/lectureSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
      sorter: (a, b) => a.course.localeCompare(b.course),
      sortDirections: ["descend", "ascend"],
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
      render: (record) => (
        <Button
          onClick={() => {
            route("/record-attendance");
            dispatch(setLectureId(record.id));
            sessionStorage.setItem("lecture_id", record.id);
          }}
        >
          Attendances
        </Button>
      ),
    },
  ];

  const [showModal, setShowModal] = useState(false);
  // --------------------------------

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
        <ToastContainer />
        {/* -------Modal Add------- */}
        <AddLecture showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default Lectures;
