export default async function handler(req, res) {
  try {
    const log = [
      { loggerid: 0 },
    ];

    res.status(200).json(log);
  } catch (error) {
    console.error('Error fetching individual cards data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
