import { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

function Home() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const newValues = [...values];
    newValues[rowIndex][columnIndex] = value;
    setValues(newValues);
  };

  const handleDownload = () => {
    // Converting data into CSV format
    const csv = Papa.unparse(parsedData);

    // Creating a Blob object to save the CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Saving the file using file-saver.js
    saveAs(blob, "data.csv");
  };

  const handleShareByEmail = () => {
    const csv = Papa.unparse(parsedData);
    const subject = "Shared CSV file";
    const body = "Please find the CSV file attached.";
    const uri = "mailto:?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(body)
      + "&attachment=" + "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    window.location.href = uri;
  };

  const handleAddRow = () => {
    const newValues = [...values];
    newValues.push(Array(tableRows.length).fill(''));
    setValues(newValues);
  };

  const handleAddColumn = () => {
    const newColumn = prompt('Enter column name');
    const newTableRows = [...tableRows, newColumn];
    const newValues = values.map((row) => [...row, '']);
    setTableRows(newTableRows);
    setValues(newValues);
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {value.map((val, columnIndex) => {
                  return (
                    <td key={columnIndex}>
                      <input
                        type="text"
                        value={val}
                        onChange={(event) =>
                          handleCellChange(
                            rowIndex,
                            columnIndex,
                            event.target.value
                          )
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Download and Share by email buttons */}
    
          <button onClick={handleDownload}>Download CSV</button>
          <button onClick={handleShareByEmail}>Share by Email</button>
          <button onClick={handleAddRow}>Add row</button>
          <button onClick={handleAddColumn}>Add Column</button>

    </div>
  );
}

export default Home;
