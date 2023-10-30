export default async function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "cmd": "stop"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://192.168.128.230:15020/filewriter/change_state", requestOptions)
    .then(response => response.json())
    .then(result => res.status(200).json())
    .catch(error => console.log('error', error));
}