require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { init } = require('./db_impl');

init();

// Create uploads directories if they don't exist
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const uploadsPath = path.join(__dirname, UPLOAD_DIR);
const flowersPath = path.join(uploadsPath, 'flowers');
const mapPath = path.join(uploadsPath, 'map');

[uploadsPath, flowersPath, mapPath].forEach(dir => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
		console.log(`Created directory: ${dir}`);
	}
});

const app = express();

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
	? [process.env.FRONTEND_URL, 'http://localhost:5173']
	: ['http://localhost:5173'];

app.use(cors({
	origin: (origin, callback) => {
		// Разрешаем запросы без origin (например, мобильные приложения, Postman)
		if (!origin) return callback(null, true);

		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/home-carousel', require('./routes/homeCarousel'));

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => console.log('Server listening on', port));
