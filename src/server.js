const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/questions', async (req, res) => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

