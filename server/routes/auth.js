const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db_impl');

router.post('/login', (req, res) => {
	const { email, password } = req.body || {};
	if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
	const row = db.getAdminByEmail(email);
	if (!row) return res.status(401).json({ error: 'Invalid credentials' });
	const match = bcrypt.compareSync(password, row.passwordHash);
	if (!match) return res.status(401).json({ error: 'Invalid credentials' });
	const token = jwt.sign({ id: row.id, email: row.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
	res.json({ token });
});

module.exports = router;
