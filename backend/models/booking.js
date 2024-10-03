const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    checkIn: Date,
    checkOut: Date
  })

  module.exports = mongoose.model('Booking', bookingSchema)
