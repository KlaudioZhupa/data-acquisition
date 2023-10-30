"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Style from './style5.css';


const CpuUsageChart = () => {


  const [cpuData, setCpuData] = useState([]);

  const updateStatistics = () => {
    fetch("/api/filewriter/fetchinginfo", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setCpuData((prevData) => [...prevData, { time: timestamp, cpu_usage: data.cpu_usage || 0 }]);
        });
      });
  };

  useEffect(() => {
    updateStatistics();
    const intervalId = setInterval(updateStatistics, 2000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <h2>CPU Usage Chart</h2>
      <LineChart width={800} height={400} data={cpuData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis dataKey="cpu_usage" />
        <Line type="monotone" dataKey="cpu_usage" stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};




const InputRateChart = () => {


  const [inputRateData, setInputRateData] = useState([]);

  const updateStatistics = () => {
    fetch("/api/filewriter/fetchinginfo", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setInputRateData((prevData) => [...prevData, { time: timestamp, input_rate: data.input_rate || 0 }]);
        });
      });
  };

  useEffect(() => {
    updateStatistics();
    const intervalId = setInterval(updateStatistics, 2000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <h2>Input Rate Chart</h2>
      <LineChart width={800} height={400} data={inputRateData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis dataKey="input_rate" />
        <Line type="monotone" dataKey="input_rate" stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};




export default function App() {
  return (
    <div className="chart-container">
      <div className="chart">
        <h1>Overall statistics Chart</h1>
        <CpuUsageChart />
      </div>
      <div className="chart">
        <h1>Overall statistics Chart</h1>
        <InputRateChart />
      </div>
    </div>
  );
};
