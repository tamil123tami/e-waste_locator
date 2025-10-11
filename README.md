# ♻️ E-Waste Locator

The **E-Waste Locator** is a web application designed to help users find the nearest electronic waste (e-waste) recycling facilities. It supports sustainable practices by simplifying access to verified recycling centers.

---

## 🚀 Features

- 🔍 Search for nearby e-waste recycling facilities  
- 🗺️ View facility details (location, contact info, accepted materials)  
- 🧩 RESTful API built with Node.js and Express  
- 💾 MongoDB for data persistence  
- 🌱 Easily extendable for a full-stack (frontend + backend) setup  

---

## 🛠️ Tech Stack

**Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- dotenv  

**Other Tools:**
- Nodemon (for development)
- JavaScript (ES6)

---

## 📂 Project Structure

e-waste-locator/
|│
|├── backend/
|├── server.js # Main server entry point
|├── package.json # Dependencies and scripts
|├── seed.js # Database seeding script
|├── models/ # Mongoose models (e.g., Facility.js)
|└── node_modules/ # Installed dependencies
|
|___frontend/
    |_index.html
    |_script.js
    |_style.css

Install dependencies:
    
npm install

Seeding Data:
To populate the database with initial facilities, run:

node seed.js

TO RUN THIS PROJECT:
cd backend
node seed.js #for data
node server.js