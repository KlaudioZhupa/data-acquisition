
"use client";
import Image from 'next/image'
import Style from 'app/fileWriter/style1.css';
import { useState, useEffect } from 'react';
import React from 'react';


export default function Messages() {

  const [logMessagesmerger, setLogMessagesMerger] = useState([]);
  const [lastLogMessageNum, setLastLogMessageNum] = useState(0);




  function logLevelToStr(level) {
    if (level < 10) return "NONE";
    else if (level < 20) return "DEBUG";
    else if (level < 30) return "INFO";
    else if (level < 40) return "WARNING";
    else if (level < 50) return "ERROR";
    return "CRITICAL";
  }




  function getLogLevelColor(level) {
    if (level === "INFO") {
      return "orange";
    } else if (level === "WARNING") {
      return "red";
    } else if (level === "CRITICAL") {
      return "darkred";
    } else {
      return "black"; // Default color for other log levels
    }
  }




  useEffect(() => {
    fetchLogMessages();
    const intervalId = setInterval(fetchLogMessages, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const fetchLogMessages = () => {
    fetch('/api/merger/fetchingmessages')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Clear any previous log messages
        setLogMessagesMerger([]);

        // Process and set new log messages
        const formattedMessages = data.reverse().map((merinfo) => ({
          num: merinfo.num,
          time: merinfo.time,
          level: logLevelToStr(merinfo.level),
          origin: merinfo.origin,
          msg: merinfo.msg,
        }));

        setLogMessagesMerger(formattedMessages);// Assuming the API returns an array of log messages
        if (data.length > 0) {
          setLastLogMessageNum(data[data.length - 1].num + 1);
        }
      })
      .catch((error) => {
        console.error('Error fetching log messages:', error);
      });
  };




  function formatMicrosecondsToHuman(timestamp) {
    if (!timestamp || typeof timestamp !== 'number') {
      return 'Invalid Timestamp';
    }

    const date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
    return date.toLocaleString(); // Format as a human-readable date
  }




  const [logMessagesFilewriter, setLogMessagesFilewriter] = useState([]); // Define logMessages state
  const [lastLogMessageNum1, setLastLogMessageNum1] = useState(0);

  useEffect(() => {
    updatelogmessages();
  }, []);


  const updatelogmessages = () => {
    fetch('/api/filewriter/fetchientries')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Clear any previous log messages
        setLogMessagesFilewriter([]);

        // Process and set new log messages
        const formattedMessages = data.reverse().map((merinfo) => ({
          num: merinfo.num,
          time: merinfo.time,
          level: logLevelToStr(merinfo.level),
          origin: merinfo.origin,
          msg: merinfo.msg,
        }));

        setLogMessagesFilewriter(formattedMessages);

        // Update the lastLogMessageNum
        if (data.length > 0) {
          setLastLogMessageNum1(data[data.length - 1].num + 1);
        }
      })
      .catch((error) => {
        console.error('Error fetching log messages:', error);
      });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    updatelogmessages();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(updatelogmessages, 1000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);




  function formatMicrosecondsToHuman(timestamp) {
    if (!timestamp || typeof timestamp !== 'number') {
      return 'Invalid Timestamp';
    }

    const date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
    return date.toLocaleString(); // Format as a human-readable date
  }


  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h2>Merger Log Messages</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Level</th>
                <th>Origin</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {logMessagesmerger.map((message, index) => (
                <tr key={index}>
                  <td>{message.num}</td>
                  <td>{formatMicrosecondsToHuman(message.time)}</td>
                  <td style={{ color: getLogLevelColor(message.level), border: '1px solid black' }}>{message.level}</td>
                  <td>{message.origin}</td>
                  <td>{message.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Filewriter Log Messages</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Level</th>
                <th>Origin</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {logMessagesFilewriter.map((merinfo, index) => (
                <tr key={index}>
                  <td>{merinfo.num}</td>
                  <td>{formatMicrosecondsToHuman(merinfo.time)}</td>
                  <td style={{ color: getLogLevelColor(merinfo.level), border: '1px solid black' }}>{merinfo.level}</td>
                  <td>{merinfo.origin}</td>
                  <td>{merinfo.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}