import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const data = [
  // {
  //   course_id: "ECOM3401",
  //   course_name: "DataBase",
  //   instructor: "Ahmed",
  //   credits: "4",
  // },
  // {
  //   course_id: "ECOM2401",
  //   course_name: "Programming 1",
  //   instructor: "Ayman",
  //   credits: "4",
  // },
  // {
  //   course_id: "ECOM2402",
  //   course_name: "Programming 2",
  //   instructor: "Ayman",
  //   credits: "4",
  // },
  // {
  //   course_id: "ECOM3403",
  //   course_name: "Data Structure",
  //   instructor: "Ahmed",
  //   credits: "4",
  // },
];
const Courses = () => {
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
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      // width: '5%',
      sorter: (a, b) => a.course_id.localeCompare(b.course_id),
      sortDirections: ["descend", "ascend"],
      // fixed: "left",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      width: "25%",
      ...getColumnSearchProps("course_name"),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      width: "30%",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
      width: "15%",
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: () => <Button>Details</Button>,
    },
  ];
  return (
    <Table
      className=" mt-5"
      columns={columns}
      dataSource={data}
      bordered
      scroll={{
        x: 500,
      }}
    />
  );
};

export default Courses;
