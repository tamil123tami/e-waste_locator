const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Clean MongoDB connection string (no deprecated options)
mongoose.connect('')
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ✅ Routes
const facilitiesRouter = require('./routes/facilities');
app.use('/api/facilities', facilitiesRouter);

// ✅ Home route with a frontend link
app.get('/', (req, res) => {
  res.send(`
    <h2>✅ E-Waste Backend is Running</h2>
    <p>Visit the frontend: <a href="http://localhost:8000" target="_blank">Click Here</a></p>
  `);
});

// ✅ Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);

});
