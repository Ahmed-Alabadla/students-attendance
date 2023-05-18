import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const data = [
  {
    id: "1",
    name: "Ahmed",
    student_number: "120200956",
    total_attendance: "23/25",
    percent_attendance: "92%",
  },
  {
    id: "2",
    name: "Mohammed",
    student_number: "120200370",
    total_attendance: "20/25",
    percent_attendance: "80%",
  },
  {
    id: "3",
    name: "Ali",
    student_number: "120200670",
    total_attendance: "10/25",
    percent_attendance: "40%",
  },
];
const ShowAttendances = () => {
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

  const rowClassName = (record, index) => {
    if (record.percent_attendance < "50%") {
      return "red-row";
    }
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
        Show Attendances
      </p>
      <Table
        rowClassName={rowClassName}
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
    </div>
  );
};

export default ShowAttendances;
