import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const ImportAttendance = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      if (
        file.name.split(".")[1] === "xlsx" ||
        file.name.split(".")[1] === "txt"
      ) {
        formData.append("files[]", file);
      }
    });
    setUploading(true);

    // You can use any AJAX library you like
    // fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFileList([]);
    //     message.success("upload successfully.");
    //   })
    //   .catch(() => {
    //     message.error("upload failed.");
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });
  };
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <div className="w-full">
      <Upload {...props} className="w-full">
        <div className="border-dashed border-2 hover:border-sky-500 rounded-lg border-gray-300 flex flex-col items-center p-3">
          <InboxOutlined className="text-5xl text-sky-600 mt-3" />

          <p className="text-lg font-medium mt-3 text-center">
            Click or drag file to this area to upload
          </p>
          <p className="text-gray-600 text-center m-5">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </div>
      </Upload>
      <Button
        type="primary"
        size="large"
        onClick={handleUpload}
        disabled={fileList.length === 0}
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
