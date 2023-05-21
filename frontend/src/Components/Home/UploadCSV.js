import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const UploadCSV = ({ active, setActive, sections, setSections }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle activation of the component
  const handleActive = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setActive(false);
  };

  // Handle reloading of old sections
  const handleReload = async () => {
    try {
      // Retrieve sections from the server
      const sectionsResponse = await axios.get(
        "http://127.0.0.1:8000/api/sections"
      );
      if (sectionsResponse.data["message"] === "success") {
        // Update the sections state
        setSections(sectionsResponse.data.sections);
      } else {
        alert("Sections failed");
      }
    } catch (error) {
      // Handle error
    }
    setActive(false);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("excel", selectedFile);

    setIsLoading(true);
    try {
      // Upload the file to the server
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
          // Retrieve updated sections from the server
          const sectionsResponse = await axios.post(
            "http://127.0.0.1:8000/api/sections"
          );
          if (sectionsResponse.data["message"] === "success") {
            // Update the sections state
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
