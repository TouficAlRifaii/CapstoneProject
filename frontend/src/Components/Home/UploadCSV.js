import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const UploadCSV = ({ active, setActive, sections, setSections }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
      const sectionsResponse = await axios.get(
        "http://127.0.0.1:8000/api/sections"
      );
      if (sectionsResponse.data["message"] === "success") {
        setSections(sectionsResponse.data.sections);
      } else {
        alert("Sections failed");
      }
    } catch (error) {
      // Handle error
    }
    setActive(false);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("excel", selectedFile);

    setIsLoading(true);
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
      setSelectedFile(null);

      if (response.data["message"] === "success") {
        // handle success
        alert("CSV file uploaded successfully!");
        try {
          const sectionsResponse = await axios.post(
            "http://127.0.0.1:8000/api/sections"
          );
          if (sectionsResponse.data["message"] === "success") {
            setSections(sectionsResponse.data.sections);
            setSelectedFile(null);

            setIsLoading(false);
            setActive(false);
            alert("Sections Created Successfully");
          } else {
            alert("Sections failed");
            setIsLoading(false);
          }
        } catch (error) {
          // Handle error
        }
      } else {
        // handle error
        setIsLoading(false);
        alert("Error uploading CSV file.");
      }
    } catch (error) {
      // handle error
      setIsLoading(false);
      alert("Error uploading CSV file.");
    }
  };

  return (
    <div>
      {active && (
        <section className="home-section">
          <div className="container">
            <div className="browse">
              <h2>Upload CSV file</h2>
              <input type="file" onChange={handleFileSelect} accept=".xlsx" />
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
