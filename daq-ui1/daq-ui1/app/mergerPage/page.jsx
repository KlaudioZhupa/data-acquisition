"use client"
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Style from './style2.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

export default function CollectorInfo() {


  const [collectorData, setCollectorData] = useState({
    cpu_usage: '',
    statistics_reset_time: '',
    inputs: [],
  });

  const updateCollectorInfo = () => {
    fetch("/api/merger/fetchinginfo", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          document.getElementById("collectorConnectionStatus").innerHTML = "Failed to fetch info!!";
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setCollectorData(data);
        });
      });

    setTimeout(updateCollectorInfo, 1000);
  };

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateCollectorInfo();
  }, []);




  // Switch interface
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));




  const [FilterData, setFilterData] = useState([]);

  const updateFilterInfo = () => {
    fetch("/api/merger/fetchingfilter", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          document.getElementById("collectorConnectionStatus").innerHTML = "Failed to fetch info!!";
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setFilterData(data);
        });
      });

    setTimeout(updateFilterInfo, 2000);
  };

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateFilterInfo();
  }, []);




  const [StatisticsData, setStatisticsData] = useState({
    cpu_usage: '',
    input_rate_filtered: '',
    input_rate_raw: '',
    rate_groups: [],
  });

  const updateStatistics = () => {
    fetch("/api/merger/fetchingstats", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setStatisticsData(data);
        });
      });

    setTimeout(updateStatistics, 2000);
  };

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateStatistics();
  }, []);




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

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateMergerInfo();
  }, []);




  const toggleMergeFlag = async (name) => {
    try {
      const response = await fetch('/api/merger/fetchingignoreflag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, ignore: !getIgnoreValue(name) }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Toggle the ignore value in the state
      setMergerData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.inputs = updatedData.inputs.map((input) => {
          if (input.name === name) {
            return { ...input, ignore: !input.ignore };
          }
          return input;
        });
        return updatedData;
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };




  const getIgnoreValue = (name) => {
    if (!MergerData || !MergerData.inputs) {
      return false;
    }

    const input = MergerData.inputs.find((input) => input.name === name);
    return input ? input.ignore : false;
  };




  const [OutputData, setOutputData] = useState({
    cpu_usage: 0,
    input_rate: 0,
    channels: [],
    outputs: [],
  });

  const updateOutputsInfo = () => {
    fetch("/api/merger/fetchingoutput", { method: 'POST' })
      .then(function (response) {
        if (response.status !== 200) {
          document.getElementById("collectorConnectionStatus").innerHTML = "Failed to fetch info!!";
          return;
        }

        response.json().then(function (data) {
          // Update the collectorData state
          setOutputData(data);
        });
      });

    setTimeout(updateOutputsInfo, 2000);
  };

  // Trigger the initial update and set up the interval
  useEffect(() => {
    updateOutputsInfo();
  }, []);




  const toggleEnableFlag = async (name) => {
    try {
      const response = await fetch('/api/merger/fetchingenableflag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, enable: !getEnableValue(name) }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Toggle the ignore value in the state
      setOutputData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.outputs = updatedData.outputs.map((merinfo) => {
          if (merinfo.name === name) {
            return { ...merinfo, enabled: !merinfo.enabled };
          }
          return merinfo;
        });
        return updatedData;
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };




  const getEnableValue = (name) => {
    if (!OutputData || !OutputData.outputs) {
      return false;
    }

    const merinfo = OutputData.outputs.find((merinfo) => merinfo.name === name);
    return merinfo ? merinfo.enabled : false;
  };

  if (!OutputData) {
    // Render a loading message or return null while waiting for data
    return <p>Loading...</p>;
  };




  const toggleRequireFlag = async (name) => {
    try {
      const response = await fetch('/api/merger/fetchingrequired', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, require: !getRequireValue(name) }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Toggle the ignore value in the state
      setMergerData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.outputs = updatedData.outputs.map((merinfo) => {
          if (merinfo.name === name) {
            return { ...merinfo, required: !merinfo.required };
          }
          return merinfo;
        });
        return updatedData;
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };




  const getRequireValue = (name) => {
    if (!OutputData || !OutputData.outputs) {
      return false;
    }

    const merinfo = OutputData.outputs.find((merinfo) => merinfo.name === name);
    return merinfo ? merinfo.required : false;
  };

  if (!OutputData) {
    // Render a loading message or return null while waiting for data
    return <p>Loading...</p>;
  };




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




  function getLogConnectColor(status) {
    if (status === "CONNECTED") {
      return "green";
    } else if (status === "NOCONNECTION") {
      return "red";
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




  function resetcollector() {
    // Prepare the data to be sent in the POST request
    const data = { cmd: "reset" };

    // Make a POST request to your desired endpoint
    fetch("/api/merger/fetchingreset")
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };




  const toggleState = async (value) => {
    try {
      const response = await fetch('/api/merger/fetchingdomerge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ do_merge: value }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };


  return (
    <main>
      <h1>TDR Merge and filter</h1>
      <h2>Collector</h2>
      <h3>Overall statistics</h3>
      <pre>
        <div>
          <table>
            <tbody>
              <tr>
                <th>CPU Usage</th>
                <td>{collectorData.cpu_usage} %</td>
              </tr>
              <tr>
                <th>Statistics reset time</th>
                <td>{new Date(parseInt(collectorData.statistics_reset_time) * 1e-3).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <h3>Individual cards</h3>
        <div id="collectorInfo">
          <table style={{ border: '1px solid black' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Port</th>
                <th>Status</th>
                <th>Rate [kB/s]</th>
                <th>Last TS</th>
                <th>Sequence</th>
                <th>00</th>
                <th>Traces</th>
                <th>Info</th>
                <th>Data</th>
                {[...Array(16)].map((_, i) => (
                  <th key={i}>I{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collectorData.inputs.map((input, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black' }}>{input.name}</td>
                  <td style={{ border: '1px solid black' }}>{input.port}</td>
                  <td style={{ color: getLogConnectColor(input.status), border: '1px solid black' }}>{input.status}</td>
                  <td style={{ border: '1px solid black' }}>{Math.round(input.rate)}</td>
                  <td style={{ border: '1px solid black' }}>{input.lastts}</td>
                  <td style={{ border: '1px solid black' }}>{input.sequence}</td>
                  {input.rectypes.map((recType, i) => (
                    <td key={i} style={{ border: '1px solid black' }}>{recType}</td>
                  ))}
                  {input.infocodes.map((infoCode, i) => (
                    <td key={i} style={{ border: '1px solid black' }}>{infoCode}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Stack className="hapesire1" direction="row" spacing={2}>
            <Button variant="contained" onClick={resetcollector}>
              <i className="" aria-hidden="true"></i>Reset
            </Button>
          </Stack>
        </div>
      </pre>


      <h2>Merger</h2>
      <tr>
        <div className="hapesire">
          <Stack className="hapesire1" direction="row" spacing={2}>
            <Button variant="contained" disabled={MergerData.do_merge} onClick={() => toggleState(true)}>
              <i className="fa fa-play-circle" aria-hidden="true"></i>  Please Merge
            </Button>

            <Button variant="contained" disabled={!MergerData.do_merge}
              onClick={() => toggleState(false)}
            >
              <i className="fa fa-stop-circle" aria-hidden="true"></i> Please Stop Merging
            </Button>
            <label style={{ fontSize: 30, color: getLogStatusColor(MergerData.state) }}>{MergerData.state}</label>
          </Stack>

        </div>
      </tr>
      <pre>
        <div>
          <div className="hapesire">
            <table>
              <tr>
                <th>CPU usage</th>
                <td>{MergerData.cpu_usage} %</td>
              </tr>
              <tr>
                <th>Input rate</th>
                <td>{MergerData.input_rate} kB/s</td>
              </tr>
              <tr>
                <th>Merged items buffered</th>
                <td>{MergerData.mergedqueue_size} items</td>
              </tr>
              <tr>
                <th>Output channel</th>
                <td>{MergerData.output_channel}</td>
              </tr>
            </table>
          </div>
          <div >
            <table style={{ border: '1px solid black' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Merge</th>
                  <th>Items</th>
                  <th>Length [s]</th>
                </tr>
              </thead>
              <tbody>
                {MergerData.inputs.map((input, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black' }}>{input.name}</td>
                    <td style={{ border: '1px solid black' }}>
                      <Android12Switch
                        checked={!input.ignore}
                        onClick={() => toggleMergeFlag(input.name)}
                      />
                    </td>
                    <td style={{ border: '1px solid black' }}>{input.queue_items}</td>
                    <td style={{ border: '1px solid black' }}>{input.queue_length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </pre>


      <h2>Filter</h2>
      <h3>Parameters and overall statistics</h3>
      <pre>
        <div>
          <table style={{ border: '1px solid black' }}>
            <tr>
              <th>CPU usage</th>
              <td>{FilterData.cpu_usage} %</td>
            </tr>
            <tr>
              <th>Input rate</th>
              <td>{FilterData.input_rate} kB</td>
            </tr>
            <tr>
              <th>DATAitems input rate</th>
              <td>{FilterData.dataitems_in_rate} items/s</td>
            </tr>
            <tr>
              <th>DATAitems input rate of triggering</th>
              <td>{FilterData.dataitems_in_triggered_rate} items/s</td>
            </tr>
            <tr>
              <th>DATAitems input rate of filtered</th>
              <td>{FilterData.dataitems_out_filtered_rate} items/s</td>
            </tr>
            <tr>
              <th>DATAitems output rate of filtered</th>
              <td>{FilterData.outputqueue_items} items/s</td>
            </tr>
            <tr>
              <th>DATAitems output rate</th>
              <td>{FilterData.dataitems_out_rate} items/s</td>
            </tr>
            <tr>
              <th>Output channel</th>
              <td>{FilterData.output_channel}</td>
            </tr>
            <tr>
              <th>Triggers</th>
              <td>{FilterData.triggers_as_hex}</td>
            </tr>
            <tr>
              <th>Filtered</th>
              <td>{FilterData.filtered_as_hex}</td>
            </tr>
            <tr>
              <th>Delay [tics]</th>
              <td>{FilterData.delay}</td>
            </tr>
            <tr>
              <th>Width [tics]</th>
              <td>{FilterData.width}</td>
            </tr>
            <tr>
              <th>Queued items</th>
              <td>{FilterData.queue_items} items</td>
            </tr>
            <tr>
              <th>Output queue items</th>
              <td>{FilterData.outputqueue_items} items</td>
            </tr>
          </table>
        </div>
      </pre>


      <h2>Statistics (histogramming etc.)</h2>
      <h3>Parameters and overall statistics</h3>
      <div>
        <div className="hapesire">
          <table style={{ border: '1px solid black' }}>
            <tr>
              <th>CPU usage</th>
              <td>{StatisticsData.cpu_usage} %</td>
            </tr>
            <tr>
              <th>Input rate "raw"</th>
              <td>{StatisticsData.input_rate_filtered} kB</td>
            </tr>
            <tr>
              <th>Input rate "filtered"</th>
              <td>{StatisticsData.input_rate_raw} kB</td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Merge</th>
                <th>Items</th>
                <th>Length [s]</th>
              </tr>
            </thead>
            <tbody>
              {StatisticsData.rate_groups.map((rate, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black' }}>{rate.group}</td>
                  <td style={{ border: '1px solid black' }}>{rate.min_interval_tics}</td>
                  <td style={{ border: '1px solid black' }}>{rate.rate}</td>
                  <td style={{ border: '1px solid black' }}>{rate.stream}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div>
        <h2>Outputs</h2>
        <h3>Overall statistics</h3>
        <pre>
          <table>
            <tr>
              <th>CPU usage</th>
              <td>{OutputData.cpu_usage} %</td>
            </tr>
            <tr>
              <th>Input rate</th>
              <td>{OutputData.input_rate} kB/s</td>
            </tr>
          </table>
          <div>
            <h3>Channels</h3>
            <label>{OutputData.state}</label>
            <table>
              <tr>
                <th>Name</th>
                <th>Input rate [kB/s]</th>
                <th>Queue size</th>
                <th>Blocks formed</th>
              </tr>
              {OutputData.channels.map((merinfo, index) => (
                <tr key={index}>
                  <td>{merinfo.name}</td>
                  <td>{merinfo.input_rate}</td>
                  <td>{merinfo.queue_size}</td>
                  <td>{merinfo.blocks_formed}</td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <h3>Individual output connections</h3>
            <label>{OutputData.state}</label>
            <table>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Address</th>
                <th>Channel</th>
                <th>Enabled</th>
                <th>Required</th>
                <th>Status</th>
                <th>Blocks sent</th>
                <th>Sequence</th>
              </tr>
              <tbody>
                {OutputData.outputs.map((merinfo, index) => (
                  <tr key={index}>
                    <td>{merinfo.type}</td>
                    <td>{merinfo.name}</td>
                    <td>{merinfo.address}</td>
                    <td>{merinfo.channel}</td>
                    <td style={{ border: '1px solid black' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Android12Switch />} checked={merinfo.enabled}
                          className={` ${merinfo.enabled ? 'enable' : 'disable'}`}
                          onClick={() => toggleEnableFlag(merinfo.name)}
                        />
                      </FormGroup>

                    </td>
                    <td style={{ border: '1px solid black' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Android12Switch />} checked={merinfo.required}
                          className={` ${merinfo.required ? 'yes' : 'no'}`}
                          onClick={() => toggleRequireFlag(merinfo.name)}
                        />
                      </FormGroup>
                    </td>
                    <td>{merinfo.status}</td>
                    <td>{merinfo.blocks_sent}</td>
                    <td>{merinfo.sequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </pre>
      </div>


      <h2>Log messages</h2>
      <div>
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
            {logMessages.map((message, index) => (
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
    </main>
  )
}