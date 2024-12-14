// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());

// Routes
const beverageRoutes = require('./routes/beverages');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

app.use('/beverages', beverageRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});