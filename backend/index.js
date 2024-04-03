const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/user');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection failed');
    process.exit(1);
  }
});
