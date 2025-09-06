import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import morgan from 'morgan';
import 'dotenv/config';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Seed demo user if env asks
(async () => {
  if (String(process.env.SEED_DEMO).toLowerCase() === 'true') {
    const users = await readUsers();
    if (!users.find(u => u.email === 'demo@demo.com')) {
      const hash = await bcrypt.hash('Demo@123', 10);
      users.push({ id: Date.now().toString(), email: 'demo@demo.com', password: hash, name: 'Demo User' });
      await writeUsers(users);
      console.log('Seeded demo user: demo@demo.com / Demo@123');
    }
  }
})();

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '2h' });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

app.get('/', (_, res) => res.json({status: 'ok'}));

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password are required' });
  const users = await readUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ message: 'Email already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hash, name: name || email.split('@')[0] };
  users.push(user);
  await writeUsers(users);
  const token = createToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = createToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, this is protected data.` });
});

app.listen(PORT, () => console.log(`Auth backend running on http://localhost:${PORT}`));
