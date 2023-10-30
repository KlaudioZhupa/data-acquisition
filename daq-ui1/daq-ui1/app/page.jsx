
// `app/page.jsx` is the UI for the `/` URL
"use client";
import Style from './style.css';
import { useState, useEffect } from 'react';
import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


export default function Home() {


  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const [opens, setOpens] = React.useState(false);
  const handleClicks = () => {
    setOpens(!opens);
  };


  const [MergerData, setMergerData] = useState({
    cpu_usage: 0,
    input_rate: 0,
    do_merge: '',
    inputs: [],
  });




  const updateMergerInfo = () => {
    fetch("/api/merger/fetchingmerger", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          document.getElementById("collectorConnectionStatus").innerHTML = "Failed to fetch info!!";
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setMergerData(data);
        });
      });

    setTimeout(updateMergerInfo, 2000);
  };




  function getLogStatusColor(state) {
    if (state === "not_merging") {
      return "red";
    } else if (state === "merging_waiting_module") {
      return "orange";
    } else if (state === "merging") {
      return "#1eff5b";
    } else {
      return "black"; // Default color for other log levels
    }
  }




  function getLogStatusColor11(state) {
    if (state === "not_merging") {
      return "NotMerging";
    } else if (state === "merging_waiting_module") {
      return "Waiting";
    } else if (state === "merging") {
      return "Merging";
    } else {
      return "black"; // Default color for other log levels
    }
  }




  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateMergerInfo();
  }, []);


  function getLogStatusColor(state) {
    if (state === "not_merging") {
      return "red";
    } else if (state === "merging_waiting_module") {
      return "orange";
    } else if (state === "merging") {
      return "green";
    } else {
      return "black"; // Default color for other log levels
    }
  }




  const [logMessages, setLogMessages] = useState([]);
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
        setLogMessages([]);

        // Process and set new log messages
        const formattedMessages = data.reverse().map((merinfo) => ({
          num: merinfo.num,
          time: merinfo.time,
          level: logLevelToStr(merinfo.level),
          origin: merinfo.origin,
          msg: merinfo.msg,
        }));

        setLogMessages(formattedMessages);// The API returns an array of log messages
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




  const [filewriterData, setFilewriterData] = useState({});
  const [currentState, setCurrentState] = useState('initial'); // initial, go, pause, stop


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




  function getLogStatusColor111(state) {
    if (state === "stopped") {
      return "Stopped";
    } else if (state === "paused") {
      return "Paused";
    } else if (state === "going") {
      return "Going";
    }
  }




  function getLogStatusColor2(state) {
    if (state === "stopped") {
      return "red";
    } else if (state === "paused") {
      return "orange";
    } else if (state === "going") {
      return "green";
    }
  }




  const [logMessages1, setLogMessages1] = useState([]); // Define logMessages state
  const [lastLogMessageNum1, setLastLogMessageNum1] = useState(0);


  useEffect(() => {
    updatelogmessages1();
  }, []);


  const updatelogmessages1 = () => {
    fetch('/api/filewriter/fetchientries')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Clear any previous log messages
        setLogMessages1([]);

        // Process and set new log messages
        const formattedMessages1 = data.reverse().map((merinfo1) => ({
          num: merinfo1.num,
          time: merinfo1.time,
          level: logLevelToStr(merinfo1.level),
          origin: merinfo1.origin,
          msg: merinfo1.msg,
        }));

        setLogMessages1(formattedMessages1);

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
    updatelogmessages1();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(updatelogmessages1, 1000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);




  function formatMicrosecondsToHuman1(timestamp) {
    if (!timestamp || typeof timestamp !== 'number') {
      return 'Invalid Timestamp';
    }

    const date = new Date(timestamp / 1000); // Convert microseconds to milliseconds
    return date.toLocaleString(); // Format as a human-readable date
  }

  const divStyle = {
    textAlign: 'center'

  };




  function getLogRotating(state) {
    if (state === "not_merging") {
      return (
        <div className="maintenance1"></div>
      );
    } else if (state === "merging") {
      return (<div>
        <div className="maintenance"></div>
      </div>
      );
    } else if (state === "merging_waiting_module") {
      return (
        <div className="maintenance1"></div>
      );
    }
  }




  function getLogRotating1(state) {
    if (state === "stopped") {
      return (
        <div className="maintenance1"></div>
      );
    } else if (state === "going") {
      return (<div>
        <div className="maintenance"></div>
      </div>);
    } else if (state === "paused") {
      return (
        <div className="maintenance1"></div>
      );
    }
  }




  const [opene, setOpene] = React.useState(false);

  const handleClicke = () => {
    setOpene(!opene);
  };

  const [collectorData, setCollectorData] = useState({
    cpu_usage: '',
    statistics_reset_time: '',
    inputs: [],
  });




  const updateCollectorInfo = () => {
    fetch("/api/merger/fetchinginforeal", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          document.getElementById("collectorConnectionStatus").innerHTML = "Failed to fetch info!!";
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setCollectorData(data);
          console.log(data.inputs[0]);
        });
      });

    setTimeout(updateCollectorInfo, 1000);
  };

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateCollectorInfo();
  }, []);




  function getConnection(status, rate) {
    if (status === "CONNECTED" && rate > 0) {
      return (<div class="led-box">
        <div class="led-green"></div>
      </div>);
    } else if (status === "NOCONNECTION") {
      return (<div class="led-box">
        <div class="led-blue"></div>
      </div>);
    } else if (status === "CONNECTED" && rate === 0) {
      return (<div class="led-box">
        <div class="led-red"></div>
      </div>);
    } else
      return "Em";
  }




  // Extract the necessary data for the table
  const cardNames = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
  const statusData = cardNames.map((cardName) => {
    const cardData = collectorData.inputs.filter((collector) => collector.name.startsWith(cardName));
    const statusArray = Array(7).fill({ status: 'EMPTY' });
    const rateIndex = Array(7).fill({ rate: 'EMPTY' });

    cardData.forEach((collector, index) => {
      statusArray[index] = { status: collector.status, rate: collector.rate };
    });

    return { cardName, statusArray };
  });




  return (
    <>
      <div className="background-image">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginLeft: "100px" }}>
            <h1 style={{ marginLeft: '885px' }}>Merger</h1>
          </div>
          <div style={{ flex: 1, marginRight: "250px" }}>
            <h1 style={{ marginLeft: '176px' }} >Filewriter</h1>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginLeft: "880px" }}>
              {getLogRotating(MergerData.state)}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div>
              {getLogRotating1(filewriterData.state)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <List style={{ marginLeft: "50px", marginTop: "-70px" }}
              sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton onClick={handleClicke}>
                <ListItemIcon className="shadow">
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Cards" className="shadow" />
                {opene ? <ExpandLess /> : <ExpandMore className="shadow" />}
              </ListItemButton>
              <Collapse in={opene} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{ maxHeight: 430, overflow: 'auto' }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon className="shadow">
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                      <div>
                        <table style={{ border: '1px solid black' }}>
                          <thead>
                            <tr>
                              <th style={{ border: '1px solid black' }}></th>
                              {[...Array(7)].map((_, i) => (
                                <th key={i}>{i + 1}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {statusData.map(({ cardName, statusArray }) => (
                              <tr key={cardName}>
                                <td>{cardName}:</td>
                                {statusArray.map((status, i) => (
                                  <td key={i}>
                                    {getConnection(status.status, status.rate)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>
          <div style={{ flex: 1 }}>
            <div
              className="buton-inside"
              style={{
                borderRadius: "50%",
                backgroundColor: "#1E1C1C",
                height: 120,
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "420px",
                marginTop: "100px",
                boxShadow: "0px 0px 20px 2px #000",
              }}
            >
              <a href='/mergerPage'><button
                className="button"
                style={{
                  borderRadius: "50%",
                  backgroundColor: getLogStatusColor(MergerData.state),
                  height: 100,
                  width: 100,
                }}>{getLogStatusColor11(MergerData.state)}</button></a>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              className="buton-inside"
              style={{
                borderRadius: "50%",
                backgroundColor: "#1E1C1C",
                height: 120,
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "215px",
                marginTop: "100px",
                boxShadow: "0px 0px 20px 2px #000",
              }}
            >
              <a href='/fileWriter'><button
                className="button"
                style={{
                  borderRadius: "50%",
                  backgroundColor: getLogStatusColor2(filewriterData.state),
                  height: 100,
                  width: 100,
                }}>{getLogStatusColor111(filewriterData.state)}</button></a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <List style={{ marginLeft: "50px", marginTop: "80px" }}
              sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}
              aria-labelledby="nested-list-subheader"
            >

              <ListItemButton onClick={handleClick}>
                <ListItemIcon className="shadow">
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Merger Messages" className="shadow" />
                {open ? <ExpandLess /> : <ExpandMore className="shadow" />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{ maxHeight: 430, overflow: 'auto' }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                      <div>
                        <table style={{ border: '1px solid black' }}>
                          <thead>
                            <tr style={{ border: '1px solid black' }}>
                              <th>ID</th>
                              <th>Time</th>
                              <th>Level</th>
                              <th>Origin</th>
                              <th>Message</th>
                            </tr>
                          </thead>
                          <tbody>
                            {logMessages.map((message, index) => (
                              <tr key={index} style={{ border: '1px solid black' }}>
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
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>

          <div style={{ flex: 1 }}>
            <List style={{ marginLeft: "50px", marginTop: "80px" }}
              sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}
              aria-labelledby="nested-list-subheader" className="shadow"
            >
              <ListItemButton onClick={handleClicks}>
                <ListItemIcon className="shadow">
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Filewriter Messages" className="shadow" />
                {opens ? <ExpandLess /> : <ExpandMore className="shadow" />}
              </ListItemButton>
              <Collapse in={opens} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{ maxHeight: 430, overflow: 'auto' }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText>
                      <div>
                        <table style={{ border: '1px solid black' }}>
                          <thead>
                            <tr style={{ border: '1px solid black' }}>
                              <th style={{ border: '1px solid black' }}>ID</th>
                              <th style={{ border: '1px solid black' }}>Time</th>
                              <th style={{ border: '1px solid black' }}>Level</th>
                              <th style={{ border: '1px solid black' }}>Origin</th>
                              <th style={{ border: '1px solid black' }}>Message</th>
                            </tr>
                          </thead>
                          <tbody>
                            {logMessages1.map((message1, index) => (
                              <tr key={index} style={{ border: '1px solid black' }}>
                                <td>{message1.num}</td>
                                <td>{formatMicrosecondsToHuman1(message1.time)}</td>
                                <td style={{ color: getLogLevelColor(message1.level), border: '1px solid black' }}>{message1.level}</td>
                                <td>{message1.origin}</td>
                                <td>{message1.msg}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </div>
        </div>
      </div>
    </>
  )
}