import express from 'express';
import User from '../models/User.js'; // Adjust the path to your User model

const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;