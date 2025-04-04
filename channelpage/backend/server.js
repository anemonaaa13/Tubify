require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const router = express.Router();

// Configurare CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode permise
  credentials: true, // Permite trimiterea cookie-urilor
};

// Inițializare server
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Conectare la baza de date MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Oprește serverul dacă baza de date nu funcționează
  });

// Rute
app.use('/auth', authRoutes);

// Servește fișierele din directorul build (frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// API endpoint-uri
app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// user details 

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = { userId: decoded.userId }; // Extragem `userId` din token
    next();
  });
};

// Ruta pentru detaliile utilizatorului
app.get('/user-details', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('username email'); // Returnăm doar ce este necesar
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

// Pornire server
const PORT = 5000; // Schimbă portul
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
