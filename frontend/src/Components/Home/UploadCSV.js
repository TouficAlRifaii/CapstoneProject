import React, { useState } from "react";
import axios from "axios";

const UploadCSV = () => {
  const [selectedFiles, setSelectedFiles] = useState();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    console.log(selectedFiles);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("excel", file);
    });
    console.log(selectedFiles[0]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data['message'] === "success") {
        // handle success
        alert("CSV files uploaded successfully!");
      } else {
        // handle error
        alert("Error uploading CSV files. hahah");
      }
    } catch (error) {
      // handle error
      alert("Error uploading CSV files.");
    }
  };

  return (
    <div>
      <h2>Upload CSV files</h2>
      <input type="file" onChange={handleFileSelect} multiple />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default UploadCSV;