import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { wait } from "@testing-library/user-event/dist/utils";

const UploadCSV = ({ active, setActive, sections, setSections }) => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleActive = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setActive(false);
  };

  const handleReload = async () => {
    try {
      const sectionsResponse = await axios.post(
        "http://127.0.0.1:8000/api/sections"
      );
      if (sectionsResponse.data["message"] === "success") {
        alert("Sections Created Sucessfully");
      } else {
        alert("Sections failed");
      }
    } catch (error) {}
    setActive(false);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("excel", file);
    });

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

      if (response.data["message"] === "success") {
        // handle success

        alert("CSV files uploaded successfully!");
        try {
          const sectionsResponse = await axios.post(
            "http://127.0.0.1:8000/api/sections"
          );
          if (sectionsResponse.data["message"] === "success") {
            alert("Sections Created Sucessfully");
          } else {
            alert("Sections failed");
          }
        } catch (error) {}
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
      {active && (
        <section className="home-section">
          <div className="container">
            <div className="browse">
              <h2>Upload CSV files</h2>

              <input type="file" onChange={handleFileSelect} multiple />
              <div>
                <button onClick={handleFileUpload} className="generate-btn">
                  Generate New one
                </button>
                <button onClick={handleReload} className="generate-btn">
                  Reload old
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <Loading isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
};

export default UploadCSV;
