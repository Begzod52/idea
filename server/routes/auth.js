import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName = '', lastName = '', email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, passwordHash });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    return res.json({ token, user: user.toJSONSafe() });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    return res.json({ token, user: user.toJSONSafe() });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: user.toJSONSafe() });
});

export default router;
