const express = require('express');
const router = require('express').Router(); // or express.Router()
const Facility = require('../models/Facility');

router.get('/', async (req, res) => {
  const facilities = await Facility.find();
  res.json(facilities);
});

router.post('/', async (req, res) => {
  const facility = new Facility(req.body);
  await facility.save();
  res.json({ message: 'Facility added' });
});

module.exports = router;
