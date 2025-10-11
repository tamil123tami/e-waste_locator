const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  type: String,
  contact: String,
  hours: String
});

module.exports = mongoose.model('Facility', facilitySchema);
