require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// View engine: EJS renders our HTML pages with data from the database
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware: parse form data and serve static files (css, logo)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.send('Server is running'));

// Connect to MongoDB, then start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('DB connection error:', err));