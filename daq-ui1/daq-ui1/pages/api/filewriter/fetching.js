export default async function handler(req, res) {
  try {
    const data = [
      {
        blocksize: 0,
        cpu_usage: 0,
        expname: "",
        file_written: 0,
        filename: "",
        input_rate: 0,
        port: 0,
        rootdirectory: "",
        run_written: 0,
        runfile_num: 0,
        runfile_prefix: "",
        runfile_subnum: 0,
        sequence: 0,
        state: "",
      },
    ];

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching individual cards data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
