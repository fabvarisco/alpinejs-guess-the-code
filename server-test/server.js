require("dotenv/config");
const cors = require('cors');
const express = require('express');
const schedule = require('node-schedule');
const routes = require('./routes/routes');
const { Challenge } = require("./functions/challenge");
const app = express();
app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.send("Test");
});

const dailyChallenge = Challenge();

app.get('/', (req, res) => {
  res.json(dailyChallenge);
});

app.post('/selectedLanguage', (req, res) => {
  const { selectedLanguage } = req.body;
  if (selectedLanguage.toLowerCase() === dailyChallenge.language.toLowerCase()) {
    res.status(200).json({ "pass": true, status: 200 });
  }else{
    res.status(200).json({ "pass": false, status: 200 });
  }
});

schedule.scheduleJob('0 0 * * *', () => {
  dailyChallenge = Challenge();
  console.log('Desafio diário atualizado.');
});


app.use((request, response) => {
  response.status(404).json({ message: "404 - Not Found", status: 404 });
});

app.use((error, request, response, next) => {
  console.log(error);
  response
    .status(error.status || 500)
    .json({ error: error.message, status: 500 });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
