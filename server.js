require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./config/app');

// Connect to MongoDB then starts server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('DB connection error:', err));