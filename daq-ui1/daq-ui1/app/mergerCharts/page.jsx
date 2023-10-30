"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Style from './style4.css';


const CpuUsageChart = () => {


  const [cpuData, setCpuData] = useState([]);

  const updateStatistics = () => {
    fetch("/api/merger/fetchingmerger", { method: 'POST' })
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
    fetch("/api/merger/fetchingmerger", { method: 'POST' })
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




const CpuUsageChart2 = () => {


  const [cpuData2, setCpuData2] = useState([]);

  const updateStatistics = () => {
    fetch("/api/merger/fetchingstats", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setCpuData2((prevData) => [...prevData, { time: timestamp, cpu_usage: data.cpu_usage || 0 }]);
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
      <LineChart width={800} height={400} data={cpuData2}>
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




const InputRateChart2 = () => {


  const [inputRateData2, setInputRateData2] = useState([]);

  const updateStatistics = () => {
    fetch("/api/merger/fetchingstats", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setInputRateData2((prevData) => [...prevData, { time: timestamp, input_rate_raw: data.input_rate_raw || 0 }]);
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
      <h2>Input Rate "raw" Chart</h2>
      <LineChart width={800} height={400} data={inputRateData2}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis dataKey="input_rate_raw" />
        <Line type="monotone" dataKey="input_rate_raw" stroke="#8884d8" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};




const InputRateChart3 = () => {


  const [inputRateData3, setInputRateData3] = useState([]);

  const updateStatistics = () => {
    fetch("/api/merger/fetchingoutput", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setInputRateData3((prevData) => [...prevData, { time: timestamp, input_rate: data.channels[0].input_rate || 0 }]);
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
      <h2>Input Rate "raw" Chart</h2>
      <LineChart width={800} height={400} data={inputRateData3}>
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




const InputRateChart4 = () => {


  const [inputRateData4, setInputRateData4] = useState([]);

  const updateStatistics = () => {
    fetch("/api/merger/fetchingoutput", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          const timestamp = new Date();
          setInputRateData4((prevData) => [...prevData, { time: timestamp, input_rate: data.channels[0].input_rate || 0 }]);
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
      <h2>Input Rate "filtered" Chart</h2>
      <LineChart width={800} height={400} data={inputRateData4}>
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
    <><div className="chart-container">
      <div className="chart">
        <h1>Merger Chart</h1>
        <CpuUsageChart />
      </div>
      <div className="chart">
        <h1>Merger Chart</h1>
        <InputRateChart />
      </div>
    </div><div className="chart-container">
        <div className="chart">
          <h1>Statistics (histogramming) Chart</h1>
          <CpuUsageChart2 />
        </div>
        <div className="chart">
          <h1>Statistics (histogramming) Chart</h1>
          <InputRateChart2 />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h1>Outputs Chart</h1>
          <InputRateChart3 />
        </div>
        <div className="chart">
          <h1>Outputs Chart</h1>
          <InputRateChart4 />
        </div>
      </div></>
  );
}
