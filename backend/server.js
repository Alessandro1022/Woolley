const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woolley-cutzz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  service: String,
  date: String,
  time: String,
  status: { type: String, default: 'Bekräftad' },
  stylistId: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    // Check if the time slot is already booked
    const existingBooking = await Booking.findOne({
      date: req.body.date,
      time: req.body.time
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Denna tid är redan bokad' });
    }

    const booking = new Booking(req.body);
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bokning borttagen' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle Vercel deployment
module.exports = app; 