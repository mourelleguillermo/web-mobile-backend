const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

db.sequelize.sync().then(() => {
  console.log('DB connected');
}).catch(err => {
  console.error('DB connection error:', err);
});

module.exports = app;
