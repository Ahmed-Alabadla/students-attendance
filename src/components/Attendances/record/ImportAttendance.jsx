import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import * as XLSX from "xlsx";
import api from "../../api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportAttendance = () => {
  const [uploading, setUploading] = useState(false);

  const [studentNumbers, setStudentNumbers] = useState([]);

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const numbers = jsonData.map((row) => row[0]);
      setStudentNumbers(numbers);
    };

    reader.readAsArrayBuffer(file);
  };

  const { lecture_id } = useSelector((state) => state.lecture);
  const token = sessionStorage.getItem("token");

  const handleUpload = () => {
    setUploading(true);
    studentNumbers.map(async (number) => {
      await api
        .post(
          "attendances",
          { student_number: number, lecture_id: lecture_id.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setUploading(false);
          toast.success(`${res.data.message} - ${number}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message + " - " + number, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    });
  };
  const { Dragger } = Upload;
  return (
    <div className="w-full">
      <Dragger beforeUpload={handleFileUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag Excel file to this area to upload
        </p>
      </Dragger>
      <ToastContainer />
      <Button
        type="primary"
        size="large"
        onClick={handleUpload}
        disabled={studentNumbers.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
        className="w-full"
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );
};
export default ImportAttendance;
