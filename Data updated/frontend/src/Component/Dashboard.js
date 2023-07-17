/* eslint-disable no-unused-vars */

// last updated code
import React, { useEffect, useState } from "react";
import exportFromJSON from 'export-from-json';
import "./Dashboard.css";
import "jspdf-autotable";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [csvData, setCsvData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDataa();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 5 * 1000); // 10-second interval

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataa = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5003/other_data");
      const data = await response.json();
      setJobData(data);
      const csvData = JSON.stringify(data, null, 2);
      setCsvData(csvData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5003/latest_jobs");
      const ldata = await response.json();
      let data = ldata.job_data;

      const fileName = 'download'
      const exportType =  exportFromJSON.types.csv

      exportFromJSON({ data, fileName, exportType })


    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {userData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Company URL</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {jobData && (
              <tr>
                <td>{jobData.date}</td>
                <td>{jobData.filename}</td>
                <td>{jobData.website}</td>
                <td>
                  <button onClick={downloadCSV} className="btn">
                    Download
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading Job Data...</p>
      )}
    </div>
  );
};

export default Dashboard;
