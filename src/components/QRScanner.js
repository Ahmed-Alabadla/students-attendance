import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QRScanner = () => {
  const [id, setId] = useState();
  const [scan, setScan] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .post(
        "attendances",
        { student_number: id, section_id: 18 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
            // Accept: "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data, {
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
        toast.error(err, {
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
    // if (token) {
    //   if (scan) {
    //   }
    // }
  }, [id]);

  return (
    <div className="flex justify-center  h-full">
      <div className=" w-[450px]">
        <QrScanner
          onDecode={(result) => {
            setId(result);
            setScan(true);
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
export default QRScanner;
