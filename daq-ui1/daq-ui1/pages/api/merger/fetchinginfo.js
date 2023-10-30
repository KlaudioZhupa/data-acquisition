export default async function handler(req, res) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  fetch("http://192.168.128.230:15010/collector/info", requestOptions)
    .then(response => response.json())
    .then(result => res.status(200).json(result))
    .catch(error => console.log('error', error));
}
