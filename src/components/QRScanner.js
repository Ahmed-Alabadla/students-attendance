import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QRScanner = () => {
  const [id, setId] = useState();

  useEffect(() => {
    api
      .post(
        "attend",
        { data: id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
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
        toast.error("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    // setTimeout(() => {
    // }, 3000);
  }, [id]);

  return (
    <div className="flex justify-center  h-full">
      <div className=" w-[500px]">
        <QrScanner
          onDecode={(result) => setId(result)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
export default QRScanner;
