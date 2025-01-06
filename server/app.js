const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const cron = require('node-cron');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', flightRoutes);
app.get('/', (req, res) => {
    res.send('Server is running and active!');
    console.log('Server is running and active!');
  });
  
  // Schedule a cron job to run every 5 minutes to keep the server alive
  cron.schedule('**/2 * * * * *', async () => {
    try {
      console.log('Pinging server to keep it awake...');
      // Change this to your actual server's public URL
      await axios.get('https://rancholabs-jatin.onrender.com');
      console.log('Server pinged successfully');
    } catch (error) {
      console.error('Error pinging the server:', error.message);
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
