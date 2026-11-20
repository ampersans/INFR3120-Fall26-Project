const mongoose = require('mongoose');

// Schema defines the shape of a book record in the database
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String },
  genre: { type: String },
  copies: { type: Number, default: 1 },
  status: { type: String, enum: ['Available', 'Checked Out'], default: 'Available' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);