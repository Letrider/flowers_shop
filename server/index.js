require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { init } = require('./db_impl');

init();

const app = express();
app.use(cors());
app.use(express.json());

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/upload', require('./routes/upload'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on', port));
