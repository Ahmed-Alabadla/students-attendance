import { Button, Form, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import AddRoom from "./AddRoom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditRoom from "./EditRoom";

const Rooms = () => {
  const route = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      route("/login");
    }
  }, []);

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
      title: "building",
      dataIndex: "building",
      key: "building",
      sorter: (a, b) => a.building.localeCompare(b.building),
      sortDirections: ["descend", "ascend"],
      // width: "25%",
    },
    {
      title: "Room number",
      dataIndex: "number",
      key: "number",
      // width: "25%",
    },

    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      // width: '10%',
      render: (record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleClickEditRoom(record)}
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

  // ----------------------------

  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Handle page change event
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      api
        .get("rooms", {
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

  // ------------------------ Edit ---------------------------
  const [showModalEditRoom, setShowModalEditRoom] = useState(false);
  const [editDataRoom, setEditDataRoom] = useState(null);

  const [formEditRoom] = Form.useForm();

  const handleClickEditRoom = (record) => {
    formEditRoom.setFieldsValue(record);
    setShowModalEditRoom(true);
    setEditDataRoom(record);
  };

  // ---------------- Modal delete Room -----------------
  const { confirm } = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: (
        <p>
          Are you sure delete this Room ({record.building + record.number})?
        </p>
      ),
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      width: 550,
      onOk() {
        api
          .delete(`rooms/${record.id}`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const updatedDataSource = tableData.filter(
              (room) => room.id !== record.id
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
        Rooms
      </p>
      <div className="flex items-end flex-col">
        <Button
          type="primary"
          className="w-fit"
          onClick={() => setShowModal(true)}
        >
          Add Room
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
        <AddRoom
          showModal={showModal}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />

        {/* ------------Edit ------------ */}
        <EditRoom
          editDataRoom={editDataRoom}
          formEditRoom={formEditRoom}
          setEditDataRoom={setEditDataRoom}
          setShowModalEditRoom={setShowModalEditRoom}
          showModalEditRoom={showModalEditRoom}
          setTableData={setTableData}
        />
      </div>
    </div>
  );
};

export default Rooms;
