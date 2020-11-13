const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const users = require('./controllers/users');
require('dotenv').config();
require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', users);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
