import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EyeFilled,
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCourses from "./ModalCourses";
import AddStudent from "./AddStudent";
import api from "../api";
import EditStudent from "./EditStudent";
import AssignCourseToStudent from "./AssignCourseToStudent";

const Students = () => {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "25%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Student number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Course",
      key: "course",
      render: (record) => (
        // <Button onClick={() => setModalCoursesForStudent(true)}>Courses</Button>
        <Button onClick={() => handleClickAssignCourse(record.id)}>
          Assign Course
        </Button>
      ),
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClickShowStudent(record)}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <EyeFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
          <button
            onClick={() => handleClickEditStudent(record)}
            className="p-2 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center"
          >
            <EditFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
          <button
            onClick={() => showDeleteConfirm(record)}
            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center"
          >
            <DeleteFilled style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
      ),
    },
  ];

  // ------------------------------------
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      api
        .get("students", {
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

  // ---------------- Modal add student -----------------
  const [showModal, setShowModal] = useState(false);

  // ---------------- Modal add course to student -----------------
  // const [modalCoursesForStudent, setModalCoursesForStudent] = useState(false);

  const [showModalAssignCourse, setShowModalAssignCourse] = useState(false);
  const [student_number, setStudent_number] = useState();

  const handleClickAssignCourse = (id) => {
    setShowModalAssignCourse(true);
    setStudent_number(id);
  };

  // ---------------- Modal delete student -----------------
  const { confirm } = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: <p>Are you sure delete this student ({record.student_name})?</p>,
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      width: 500,
      onOk() {
        console.log("OK");

        toast.success("delete successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // ---------------- Modal show student -----------------
  const [showModalShowStudent, setShowModalShowStudent] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const handleClickShowStudent = (record) => {
    setShowModalShowStudent(true);
    setStudentData(record);
  };

  // ---------------- Modal edit student -----------------
  const [showModalEditStudent, setShowModalEditStudent] = useState(false);
  const [editDataStudent, setEditDataStudent] = useState(null);

  const [formEditStudent] = Form.useForm();

  const handleClickEditStudent = (record) => {
    formEditStudent.setFieldsValue(record);
    setShowModalEditStudent(true);
    setEditDataStudent(record);
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
        {/* -------Modal add student------- */}
        <AddStudent
          showModal={showModal}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />
        {/* -------Modal add course to student------- */}
        {/* <ModalCourses
          modalCoursesForStudent={modalCoursesForStudent}
          setModalCoursesForStudent={setModalCoursesForStudent}
        /> */}
        <AssignCourseToStudent
          showModalAssignCourse={showModalAssignCourse}
          setShowModalAssignCourse={setShowModalAssignCourse}
          student_number={student_number}
        />
        {/* -------Modal edit student------- */}
        <EditStudent
          showModalEditStudent={showModalEditStudent}
          setShowModalEditStudent={setShowModalEditStudent}
          editDataStudent={editDataStudent}
          setEditDataStudent={setEditDataStudent}
          formEditStudent={formEditStudent}
        />
        {/* -------Modal show student------- */}
        <Modal
          open={showModalShowStudent}
          onCancel={() => {
            setShowModalShowStudent(false);
            setStudentData(null);
          }}
          footer={[]}
          centered
        >
          <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
            Details student
          </p>

          <div className="flex flex-col gap-5">
            <div className="bg-[#F4F6F9] p-2.5 shadow rounded-lg">
              <p className="text-base font-medium">Student name :</p>
              <p className="mt-1.5 text-gray-500">{studentData?.name}</p>
            </div>
            <div className="bg-[#F4F6F9] p-2.5 shadow rounded-lg">
              <p className="text-base font-medium">Student number :</p>
              <p className="mt-1.5 text-gray-500">{studentData?.number}</p>
            </div>
            <div className="bg-[#F4F6F9] p-2.5 shadow rounded-lg">
              <p className="text-base font-medium">Phone number :</p>
              <p className="mt-1.5 text-gray-500">
                {studentData?.phone_number}
              </p>
            </div>
            <div className="bg-[#F4F6F9] p-2.5 shadow rounded-lg">
              <p className="text-base font-medium">Address :</p>

              {/* <div className="flex gap-5 mt-3 items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 border rounded-xl">
                  <p className=""> City :</p>
                  <p className="">{studentData?.address.city}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 border rounded-xl">
                  <p className="">Street :</p>
                  <p className="">{studentData?.address.street}</p>
                </div>
              </div> */}
            </div>
            <div className="bg-[#F4F6F9] p-2.5 shadow rounded-lg">
              <p className="text-base font-medium">Courses :</p>

              <div className="flex gap-5 mt-3 items-center flex-wrap justify-center">
                <p className="px-3 py-1.5 border rounded-xl"> Database</p>
                <p className="px-3 py-1.5 border rounded-xl">Control</p>
                <p className="px-3 py-1.5 border rounded-xl">Java 2</p>
                <p className="px-3 py-1.5 border rounded-xl">Logic design</p>
                <p className="px-3 py-1.5 border rounded-xl">
                  Digital Electronic
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Students;
