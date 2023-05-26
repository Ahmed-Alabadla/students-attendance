import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AddAssistant from "./AddAssistant";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignCourseToAssistant from "./AssignCourseToAssistant";
import EditAssistant from "./EditAssistant";

const Assistants = () => {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Course",
      key: "course",
      render: (record) => (
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
      render: (record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClickEditAssistant(record)}
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

  const [showModal, setShowModal] = useState(false);
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
        .get("assistants", {
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

  // ---------------- Modal assign course to assistant -----------------

  const [showModalAssignCourse, setShowModalAssignCourse] = useState(false);
  const [assistant_id, setAssistant_id] = useState();

  const handleClickAssignCourse = (id) => {
    setShowModalAssignCourse(true);
    setAssistant_id(id);
  };

  // ------------------------ Edit ---------------------------
  const [showModalEditAssistant, setShowModalEditAssistant] = useState(false);
  const [editDataAssistant, setEditDataAssistant] = useState(null);

  const [formEditAssistant] = Form.useForm();

  const handleClickEditAssistant = (record) => {
    formEditAssistant.setFieldsValue(record);
    setShowModalEditAssistant(true);
    setEditDataAssistant(record);
  };

  // ---------------- Modal delete Assistant -----------------
  const { confirm } = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: <p>Are you sure delete this assistant ({record.name})?</p>,
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      width: 550,
      onOk() {
        api
          .delete(`assistants/${record.id}`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const updatedDataSource = tableData.filter(
              (assistant) => assistant.id !== record.id
            );
            setTableData(updatedDataSource);

            toast.success(res.data.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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

        {/* -------Modal Add------- */}
        <AddAssistant
          showModal={showModal}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />

        {/* ----------Assign course------------- */}
        <AssignCourseToAssistant
          showModalAssignCourse={showModalAssignCourse}
          setShowModalAssignCourse={setShowModalAssignCourse}
          assistant_id={assistant_id}
        />

        {/* ------------Edit ------------ */}
        <EditAssistant
          editDataAssistant={editDataAssistant}
          formEditAssistant={formEditAssistant}
          setEditDataAssistant={setEditDataAssistant}
          setShowModalEditAssistant={setShowModalEditAssistant}
          showModalEditAssistant={showModalEditAssistant}
          setTableData={setTableData}
        />
      </div>
    </div>
  );
};

export default Assistants;
