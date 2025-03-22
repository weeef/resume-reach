const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  const { jobDescription } = req.body;
  const resumePath = req.file.path;

  // Call Python AI service for analysis
  const analysis = await axios.post('http://localhost:5000/analyze', {
    resumePath,
    jobDescription,
  });

  res.json(analysis.data);
});

app.listen(5001, () => console.log('Backend running on port 5001'));