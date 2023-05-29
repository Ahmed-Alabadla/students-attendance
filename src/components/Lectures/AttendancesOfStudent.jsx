import { Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api";

const AttendancesOfStudent = ({
  showAttendancesOfStudent,
  setShowAttendancesOfStudent,
  lectureData,
  setLectureData,
}) => {
  const columns = [
    {
      title: "Student number",
      dataIndex: "student_number",
      key: "student_number",
    },
    {
      title: "Attendance",
      dataIndex: "is_attended",
      key: "is_attended",
      render: (text) => (
        <>
          {text === 0 && <Tag color="#f50">NO</Tag>}
          {text === 1 && <Tag color="#87d068">YES</Tag>}
        </>
      ),
    },
  ];
  const [tableData, setTableData] = useState([]);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    console.log(lectureData);
    // api
    //   .post("attendances", lectureData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       "X-HTTP-Method-Override": "GET",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setTableData(res.data.data);
    //   });
    api
      .get(
        `attendances?lecture_id=${lectureData.lecture_id}&course_id=${lectureData.course_id}&section_id=${lectureData.section_id}&year=${lectureData.year}&semester=${lectureData.semester}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // "X-HTTP-Method-Override": "GET",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTableData(res.data.data);
      });
  }, []);

  return (
    <>
      <Modal
        open={showAttendancesOfStudent}
        onCancel={() => {
          setShowAttendancesOfStudent(false);
        }}
        footer={[]}
        style={{
          top: 35,
        }}
      >
        <p className="text-2xl font-semibold text-center mt-7 mb-5 text-[#008ECC]">
          Attendances of student
        </p>

        <Table
          className="w-full mt-5"
          columns={columns}
          dataSource={tableData}
          bordered
        />
      </Modal>
    </>
  );
};

export default AttendancesOfStudent;
