// backend/routes/beverages.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk mengupload gambar
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `/images/${req.file.filename}`;
  res.json({ imageUrl });
});

// Endpoint untuk menambah beverage baru dengan URL gambar
router.post('/', (req, res) => {
  const { name, description, price, image_url, category, is_available } = req.body;
  const query = 'INSERT INTO beverages (name, description, price, image_url, category, is_available) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, image_url, category, is_available], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Get all beverages
router.get('/', (req, res) => {
  const query = 'SELECT * FROM beverages';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new beverage
router.post('/', (req, res) => {
  const { name, description, price, image_url, category, is_available } = req.body;
  const query = 'INSERT INTO beverages (name, description, price, image_url, category, is_available) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, image_url, category, is_available], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

// Update a beverage
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category, is_available } = req.body;
  const query = 'UPDATE beverages SET name = ?, description = ?, price = ?, image_url = ?, category = ?, is_available = ? WHERE id = ?';
  db.query(query, [name, description, price, image_url, category, is_available, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Beverage updated' });
  });
});

// Delete a beverage
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM beverages WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Beverage deleted' });
  });
});

module.exports = router;