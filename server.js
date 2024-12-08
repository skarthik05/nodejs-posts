const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const postRoutes = require('./routes/posts');
const tagRoutes = require('./routes/tags');
const { connectDB } = require('./config');

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); 

connectDB();
// Routes
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
