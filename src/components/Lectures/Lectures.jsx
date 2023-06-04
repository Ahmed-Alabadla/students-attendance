import { Button, Form, Input, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AddLecture from "./AddLecture";
import { ToastContainer } from "react-toastify";
import { setLectureId } from "../../redux/lectureSlice";
import { useDispatch } from "react-redux";
import { Option } from "antd/es/mentions";
import api from "../api";
import AttendancesOfStudent from "./AttendancesOfStudent";

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
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   // width: '5%',
    //   sorter: (a, b) => a.id - b.id,
    //   sortDirections: ["descend", "ascend"],
    //   // fixed: "left",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      fixed: "left",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      // sorter: (a, b) => a.course.localeCompare(b.course),
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      // sorter: (a, b) => a.year.localeCompare(b.year),
      // sortDirections: ["descend", "ascend"],
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
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "#. Attendances / #. Students",
      dataIndex: "total",
      key: "total",
      render: (text, record) => (
        <span>
          {record.number_of_attendance + " / " + record.number_of_Students}
        </span>
      ),
      sorter: (a, b) => a.total.localeCompare(b.total),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Attendance Percentage",
      dataIndex: "attendance_percentage",
      key: "attendance_percentage",
      render: (text) => `${text}%`,
      sorter: (a, b) =>
        a.attendance_percentage.localeCompare(b.attendance_percentage),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 250,
      render: (record) => (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              route("/record-attendance");
              dispatch(setLectureId(record));
              sessionStorage.setItem("lecture_id", record);
            }}
          >
            Attendances
          </Button>
          <Button onClick={() => onClickShowAttendancesOfStudent(record)}>
            Details
          </Button>
        </div>
      ),
    },
  ];

  // ---------------Modal add lecture-----------------
  const [showModal, setShowModal] = useState(false);
  // --------------------------------

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // --------------lecture list --------------------
  const [showLecture, setShowLecture] = useState(false);
  // const [showInputSection, setShowInputSection] = useState(false);
  const [showAttendancesOfStudent, setShowAttendancesOfStudent] =
    useState(false);
  const [tableData, setTableData] = useState([]);
  const [lectureData, setLectureData] = useState({});

  const onClickShowAttendancesOfStudent = (record) => {
    setLectureData((prevData) => ({
      ...prevData,
      section_id: getSectionIdBySectionName(record.section),
      lecture_id: record.id,
      // Update other properties as needed
    }));
    setShowAttendancesOfStudent(true);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    setLectureData({
      course_id: values.course_id,
      section_id: values.section_id,
      year: values.year,
      semester: values.semester,
    });

    api
      .post("lectures", values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-HTTP-Method-Override": "GET",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTableData(res.data.data);
        setShowLecture(true);
        form.resetFields();
      });
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
        .catch((err) => console.log(err));
    }
  }, [token]);

  // ----------Sections in course------------------

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
        .catch((err) => console.log(err));
    }
  }, [course_id, token]);

  function getSectionIdBySectionName(number) {
    for (let i = 0; i < sectionList.length; i++) {
      if (sectionList[i].number === number) {
        return sectionList[i].id;
      }
    }
    return null; // Return null if the section_name is not found
  }

  return (
    <div className="bg-[#F4F6F9] h-full  rounded-lg flex flex-col  gap-16">
      <p className="text-2xl font-semibold text-center  text-[#008ECC]">
        Lectures
      </p>
      <div className="flex items-end flex-col">
        {showLecture ? (
          <>
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
                x: 1300,
              }}
            />
          </>
        ) : (
          <>
            <div className="flex items-center mb-5 gap-5">
              {/* <p className="flex items-center gap-3">
                with section
                <Checkbox
                  onChange={(e) => setShowInputSection(e.target.checked)}
                ></Checkbox>
              </p> */}

              <Button
                type="primary"
                className="w-fit"
                onClick={() => setShowModal(true)}
              >
                Add Lecture
              </Button>
            </div>
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

              <Form.Item className="!mb-0" wrapperCol={{ offset: 0, span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full "
                >
                  Show Lecture
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        <ToastContainer />
        {/* -------Modal Add------- */}
        <AddLecture
          showModal={showModal}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />

        {/* ------------AttendancesOfStudent-------------- */}
        {showAttendancesOfStudent && (
          <AttendancesOfStudent
            showAttendancesOfStudent={showAttendancesOfStudent}
            setShowAttendancesOfStudent={setShowAttendancesOfStudent}
            lectureData={lectureData}
            setLectureData={setLectureData}
          />
        )}
      </div>
    </div>
  );
};

export default Lectures;
