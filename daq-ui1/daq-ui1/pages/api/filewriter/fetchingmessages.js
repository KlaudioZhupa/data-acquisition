export default async function handler(req, res) {
  try {
    const data = [
      {
        level: 0,
        msg: "",
        num: 0,
        origin: "",
        time: 0
      }
    ];

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching individual cards data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
