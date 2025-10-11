const mongoose = require('mongoose');
const Facility = require('./models/Facility');

// ✅ Replace this with your actual MongoDB connection string
mongoose.connect('mongodb+srv://tamil:CcCaLscdtA3jCP5F@cluster0.8yj1zzc.mongodb.net/eWasteDB?retryWrites=true&w=majority')
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Delete existing records
    await Facility.deleteMany({});

    // Insert facilities
    await Facility.insertMany([
      // 🔹 Trichy
      {
        name: "Micro E-Waste Recyclers",
        lat: 10.7905, lng: 78.7047,
        type: "E-Waste Recycler",
        contact: "Not listed",
        hours: "Check with facility"
      },
      // 🔹 Coimbatore
      {
        name: "Green India Recyclers",
        lat: 10.9389, lng: 77.0433,
        type: "Centered Recycler",
        contact: "9003491034",
        hours: "9am – 5pm"
      },
      {
        name: "Green Era Recyclers",
        lat: 11.0280, lng: 76.9650,
        type: "E-Waste Processing",
        contact: "9965664526",
        hours: "9am – 5pm"
      },
      // 🔹 Sriperumbudur / Oragadam
      {
        name: "Enviro Metals Recyclers Pvt Ltd",
        lat: 12.8380, lng: 79.9210,
        type: "E-Waste Recycler",
        contact: "044‑27107223",
        hours: "9am – 5pm"
      },
      {
        name: "TES-AMM India Pvt Ltd",
        lat: 12.8908, lng: 79.9587,
        type: "Authorized Recycler",
        contact: "044‑45000353",
        hours: "9am – 6pm"
      },
      {
        name: "S.P.P. Enterprises",
        lat: 12.8253, lng: 79.9369,
        type: "Recycling Center",
        contact: "044‑27169088",
        hours: "9am – 6pm"
      },
      // 🔹 Chengalpattu
      {
        name: "SEZ Recycling",
        lat: 12.7955, lng: 80.0420,
        type: "E-Waste Recycler",
        contact: "9790711555",
        hours: "9am – 5pm"
      },
      {
        name: "Leela Traders",
        lat: 12.7958, lng: 80.0433,
        type: "Recycling Center",
        contact: "9380888811",
        hours: "9am – 5pm"
      },
      // 🔹 Tambaram
      {
        name: "Trishyiraya Recycling India Pvt Ltd",
        lat: 12.9380, lng: 80.0881,
        type: "E-Waste Recycler",
        contact: "044‑22628067",
        hours: "9am – 5pm"
      },
      // 🔹 Ambattur Industrial Estate
      {
        name: "Green E Waste (Ambattur)",
        lat: 13.1167, lng: 80.1499,
        type: "E-Waste Recycler",
        contact: "044‑26534690",
        hours: "9am – 5pm"
      },
      {
        name: "Abishek Enterprises",
        lat: 13.1172, lng: 80.1513,
        type: "E-Waste Recycler",
        contact: "044‑23637878",
        hours: "9am – 5pm"
      },
      {
        name: "SKV E-Waste Recycling Pvt Ltd",
        lat: 13.1170, lng: 80.1580,
        type: "E-Waste Recycler",
        contact: "9094345145",
        hours: "9am – 5pm"
      },
      {
        name: "Udhaya Traders",
        lat: 13.1185, lng: 80.1450,
        type: "Recycling Center",
        contact: "7397438071",
        hours: "9am – 5pm"
      },
      // 🔹 Tiruvallur / Gummidipoondi
      {
        name: "Virogreen India Pvt Ltd",
        lat: 13.4369, lng: 80.2875,
        type: "Authorized Recycler",
        contact: "044‑42959595",
        hours: "9am – 6pm"
      },
      {
        name: "Shri Raam Recycling",
        lat: 13.4560, lng: 80.2970,
        type: "Recycling Center",
        contact: "9884499191",
        hours: "9am – 5pm"
      },
      {
        name: "Enviro Metals Recyclers (Gummidipoondi)",
        lat: 13.4565, lng: 80.2965,
        type: "E-Waste Recycler",
        contact: "044‑27107223",
        hours: "9am – 5pm"
      }
    ]);

    console.log("✅ Tiered TN e-waste centers inserted (small ➝ large)");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
