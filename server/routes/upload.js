const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', UPLOAD_DIR));
	},
	filename: function (req, file, cb) {
		const name = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
		cb(null, name);
	}
});
const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'No file' });
	const url = `/uploads/${req.file.filename}`;
	res.json({ url });
});

module.exports = router;
