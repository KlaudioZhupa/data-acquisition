export default async function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var _lastLogMessageNum = 0;
  var raw = JSON.stringify({
    "firstnum": _lastLogMessageNum = 0,
    "lastnum": 99999999
  });
  const data = [
    {
      level: 0,
      msg: "",
      num: 0,
      origin: "",
      time: 0
    }
  ];
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://192.168.128.230:15010/logger/entries", requestOptions)
    .then(response => response.json())
    .then(result => res.status(200).json(result))
    .catch(error => console.log('error', error));
}