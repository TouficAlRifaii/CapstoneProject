import React, { useState } from 'react';

const UploadCSV = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('csv', file);
    });

    const response = await fetch('/api/upload-csv', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // handle success
      alert('CSV files uploaded successfully!');
    } else {
      // handle error
      alert('Error uploading CSV files.');
    }
  };

  return (
    <div>
      <h2>Upload CSV files</h2>
      <input type="file" onChange={handleFileSelect} multiple />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default UploadCSV