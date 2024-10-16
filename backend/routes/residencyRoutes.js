import express from 'express';
import Residency from '../models/Residency.js';

const router = express.Router();

// Create a new residency
router.post('/', async (req, res) => {
  const { title, description, price, address, city, country, image, facilities, userEmail, owner } = req.body;
  try {
    const residency = new Residency({ title, description, price, address, city, country, image, facilities, userEmail, owner });
    await residency.save();
    res.status(201).json(residency);
  } catch (error) {
    console.error('Error creating residency:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all residencies
router.get('/', async (req, res) => {
  try {
    const residencies = await Residency.find();
    res.json(residencies);
  } catch (error) {
    console.error('Error fetching residencies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;