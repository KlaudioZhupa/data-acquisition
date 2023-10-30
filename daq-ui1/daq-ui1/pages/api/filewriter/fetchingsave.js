export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { expname, runfile_prefix } = req.body;

      // Create the JSON request body
      const requestBody = JSON.stringify({ expname, runfile_prefix });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      };

      // Send a POST request to the external API endpoint
      const response = await fetch('http://192.168.128.230:15020/filewriter/save_settings', requestOptions);

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      // Assuming the settings are saved successfully, send a response
      res.status(200).json({ message: 'Settings saved successfully' });
    } catch (error) {
      console.error('Error saving settings:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else {
    // Return a 405 Method Not Allowed if a different HTTP method is used
    res.status(405).end();
  }
}