// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all orders
router.get('/', (req, res) => {
  const query = 'SELECT * FROM orders';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new order
router.post('/', (req, res) => {
  const { customer_name, total_price, status } = req.body;
  const query = 'INSERT INTO orders (customer_name, total_price, status) VALUES (?, ?, ?)';
  db.query(query, [customer_name, total_price, status], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Update an order
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Order updated' });
  });
});

// Delete an order
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM orders WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Order deleted' });
  });
});

module.exports = router;