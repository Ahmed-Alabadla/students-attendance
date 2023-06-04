import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const QRScanner = () => {
  const [id, setId] = useState(null);
  const token = sessionStorage.getItem("token");

  const { lecture_id } = useSelector((state) => state.lecture);
  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchData() {
      if (id) {
        await api
          .post(
            "attendances",
            { student_number: id, lecture_id: lecture_id.id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            toast.success(`${res.data.message} - ${id}`, {
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
            // console.log(err);
            toast.error(err.response.data.message, {
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
      }
    }
    fetchData();
  }, [id, token]);

  return (
    <div className="flex justify-center  h-full">
      <div className=" w-[400px]">
        <QrScanner
          onDecode={(result) => setId(result)}
          // onError={(error) => console.log(error?.message)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
export default QRScanner;
