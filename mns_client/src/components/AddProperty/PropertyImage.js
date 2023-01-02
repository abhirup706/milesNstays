import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { Card } from "react-bootstrap";
import axios from "axios";

function PropertyImage({ formData, setFormData }) {
  const [selectedFile, setSelectedFiles] = useState([]);

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleDone = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      cost: {
        ...prevFormData.cost,
        [name]: value,
      },
    }));
  };

  const fileSelectedHandler = (event) => {
    console.log(event.target.files);
    setSelectedFiles(event.target.files);
  };

  const fileUploadHandler = async () => {
    const Data = new FormData();
    Object.values(selectedFile).forEach((file) => {
      Data.append("file", file);
    });
    try {
      const res = await axios.post(
        "http://localhost:3000/listings/save-image",
        Data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: res.data,
      }));
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Card style={{ marginBottom: "5%", width: "60%", marginLeft: "20%" }}>
      <Card.Header>Upload Property Images</Card.Header>
      <Card.Body style={{ padding: "10%" }}>
        <input type="file" onChange={fileSelectedHandler} multiple="multiple" />
        <button onClick={fileUploadHandler}>Upload</button>
      </Card.Body>
    </Card>
  );
}

export default PropertyImage;
