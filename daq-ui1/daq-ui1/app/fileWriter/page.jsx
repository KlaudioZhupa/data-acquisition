"use client";
import Image from 'next/image'
import Style from './style1.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function FileWriter() {


  var _lastLogMessageNum = 0;

  const [filewriterData, setFilewriterData] = useState({});
  const [currentState, setCurrentState] = useState('initial'); // initial, go, pause, stop
  const [loggerData, setLoggerData] = useState([]);

  const [logData, setLogData] = useState({});
  function updateLogData() {
    return fetch("/api/filewriter/mlinfo", { method: 'POST' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch(error => {
        throw new Error("Error occurred when fetching info. Error message: " + error.message);
      });
  }

  useEffect(() => {
    updateLogData()
      .then(dataa => {
        setLogData(dataa);
      })
      .catch(error => {
        console.error("Error fetching filewriter info:", error);
      });

  }, []);




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



  function getLogStateColor(state) {
    if (state === "stopped") {
      return "red";
    } else if (state === "paused") {
      return "orange";
    } else if (state === "going") {
      return "green";
    } else {
      return "black"; // Default color for other log levels
    }
  }




  const changeState_GO = () => {
    // Prepare the data to be sent in the POST request
    const data = { cmd: "go" };

    // Make a POST request to your desired endpoint
    fetch("/api/filewriter/fetchinggo")
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };




  const changeState_STOP = () => {
    fetch("/api/filewriter/fetchingstop")
      .then(response => response.json())
      .then(data => { })
      .catch(error => {
        console.error("Error:", error);
      });
  }




  const changeState_PAUSE = () => {
    fetch("/api/filewriter/fetchingbutton")
      .then(response => response.json())
      .then(data => { })
      .catch(error => {
        setCurrentState('pause');
        console.error("Error:", error);
      });
  }




  if (filewriterData.state === "going") {
    var stat = true;
  }
  else {
    var stat = false;
  }




  const fetchFilewriterInfo = () => {
    return fetch("/api/filewriter/fetchinginfo", { method: 'POST' })
      .then(response => response.json())
      .catch(error => {
        let p = document.getElementById("filewriter_info_fetch_error");
        p.innerHTML = "Error occurred when fetching info. Error message: " + error.message;
      });
  };




  const settings_load = () => {
    fetchFilewriterInfo()
      .then(data => {
        document.getElementById("input_settings_expname").value = data["expname"];
        document.getElementById("input_settings_prefix").value = data["runfile_prefix"];
      });
  };




  function settings_save() {
    const expname = document.getElementById("input_settings_expname").value;
    const runfile_prefix = document.getElementById("input_settings_prefix").value;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expname, runfile_prefix }),
    };

    fetch('/api/filewriter/fetchingsave', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Settings saved:', data);
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  }




  // Function to fetch filewriter data
  const updateFilewriterData = () => {
    fetch("/api/filewriter/fetchinginfo", { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataa) => {
        setFilewriterData(dataa);
      })
      .catch((error) => {
        console.error("Error fetching filewriter info:", error);
      });
  };

  // Use useEffect to fetch data when the component mounts and at 1-second intervals
  useEffect(() => {
    // Fetch data when the component mounts
    updateFilewriterData();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(updateFilewriterData, 1000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);




  const updateLoggerInfo = () => {
    fetch("/api/filewriter/fetchinglogger", { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataa) => {
        setLoggerData(dataa);
        console.log(dataa);
      })
      .catch((error) => {
        console.error("Error fetching filewriter info:", error);
      });
  };

  useEffect(() => {
    // Fetch filewriter info when the component mounts
    updateLoggerInfo();

    // Set up an interval to periodically fetch the data
    const interval = setInterval(updateLoggerInfo, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);




  const [logMessages, setLogMessages] = useState([]); // Define logMessages state
  const [lastLogMessageNum, setLastLogMessageNum] = useState(0);

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
        setLogMessages([]);

        // Process and set new log messages
        const formattedMessages = data.reverse().map((merinfo) => ({
          num: merinfo.num,
          time: merinfo.time,
          level: logLevelToStr(merinfo.level),
          origin: merinfo.origin,
          msg: merinfo.msg,
        }));

        setLogMessages(formattedMessages);

        // Update the lastLogMessageNum
        if (data.length > 0) {
          setLastLogMessageNum(data[data.length - 1].num + 1);
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




  const send_elog_msg = () => {
    let text = document.getElementById("input_elog_msg").value;
    alert(text);
  }

  useEffect(() => {
    updateFilewriterData();
    updateLoggerInfo();
    updatelogmessages();
  }, []);




  return (
    <main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <meta charSet="UTF-8" />

      <div>
        <h1>TDR FileWriter</h1>
        <p style={{ fontSize: 30, color: "red" }} id="filewriter_log_fetch_error" />
        <div >
          <Stack className="hapesire1" direction="row" spacing={2}>
            <Button className="button_bigbutton" variant="contained" disabled={stat} onClick={changeState_GO}>
              <i className="fa fa-play-circle green" aria-hidden="true"> GO</i>
            </Button>

            <Button variant="contained" disabled={!stat} onClick={changeState_STOP}
            >
              <i className="fa fa-stop-circle stop" aria-hidden="true"> Stop</i>
            </Button>

            <Button variant="contained" disabled={!stat} onClick={changeState_PAUSE}
            >
              <i className="fa fa-pause-circle pause" aria-hidden="true"> Pause</i>
            </Button>
          </Stack>
        </div>




        <h3>Overall statistics</h3>
        <table>
          <tbody>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>CURRENT RUN</td>
              <td>{filewriterData.runfile_num}</td>
            </tr>
            <tr>
              <td>Blocksize</td>
              <td>{filewriterData.blocksize}</td>
            </tr>
            <tr>
              <td>CPU Usage</td>
              <td>{filewriterData.cpu_usage}</td>
            </tr>
            <tr>
              <td>Input rate [kB/s]</td>
              <td>{filewriterData.input_rate}</td>
            </tr>
            <tr>
              <td>State</td>
              <td style={{ color: getLogStateColor(filewriterData.state), border: '1px solid black' }}>{filewriterData.state}</td>
            </tr>
            <tr>
              <td>Listening port</td>
              <td>{filewriterData.port}</td>
            </tr>
            <tr>
              <td>Root directory</td>
              <td>{filewriterData.rootdirectory}</td>
            </tr>
            <tr>
              <td>Experiment name (subdir)</td>
              <td>{filewriterData.expname}</td>
            </tr>
            <tr>
              <td>Filename</td>
              <td>{filewriterData.filename}</td>
            </tr>
            <tr>
              <td>MB written current run</td>
              <td>{filewriterData.run_written * 1e-6}</td>
            </tr>
            <tr>
              <td>MB written current file</td>
              <td>{filewriterData.file_written * 1e-6}</td>
            </tr>
            <tr>
              <td>Sequence out</td>
              <td>{filewriterData.sequence}</td>
            </tr>
          </tbody>
        </table>




        <h3>ELOG SHORTCUT</h3>
        <label htmlFor="input_elog_msg"> Elog message: </label>
        <input type="text" id="input_elog_msg" className="input_text" name="input_elog_msg" />
        <br />
        <Stack className="hapesire1" direction="row" spacing={2}>
          <Button className="button_bigbutton" variant="contained" onClick={send_elog_msg}>
            <i className="fa fa-paper-plane" aria-hidden="true"> Send</i>
          </Button>
        </Stack>




        <h3>Settings</h3>
        <label htmlFor="input_settings_expname">
          Experiment name (subdirectory):
        </label>
        <input
          type="text"
          id="input_settings_expname"
          className="input_text"
          name="input_settings_expname"
        />
        <br />
        <label htmlFor="input_settings_prefix">Filename prefix:</label>
        <input type="text" id="input_settings_prefix" className="input_text" name="input_settings_prefix" />
        <br />




        <Stack className="hapesire1" direction="row" spacing={2}>
          <Button className="button_bigbutton" variant="contained" onClick={settings_load}>
            <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"> </i> Load
          </Button>

          <Button variant="contained" onClick={settings_save}
          >
            <i className="fa fa-floppy-o" aria-hidden="true"> Save</i>
          </Button>
        </Stack>




        <h2>Log messages</h2>
        <p style={{ fontSize: 30, color: "red" }} id="filewriter_log_fetch_error" />
        <h3>Info</h3>
        <pre className="hapesire">
          <table>
            <tr>
              <th>LoggerID</th>
              <td>{loggerData.loggerid}</td>
            </tr>
          </table>
        </pre>
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Level</th>
              <th>Origin</th>
              <th>Message</th>
            </tr>
            {logMessages.map((merinfo, index) => (
              <tr key={index}>
                <td>{merinfo.num}</td>
                <td>{formatMicrosecondsToHuman(merinfo.time)}</td>
                <td style={{ color: getLogLevelColor(merinfo.level), border: '1px solid black' }}>{merinfo.level}</td>
                <td>{merinfo.origin}</td>
                <td>{merinfo.msg}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </main>
  )
}
