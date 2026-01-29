const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'db.sqlite');
const db = new Database(DB_PATH);

function init() {
	db.pragma('journal_mode = WAL');

	db.prepare(
		`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )`
	).run();

	db.prepare(
		`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      care TEXT,
      fertilizers TEXT,
      images TEXT,
      featuredImage TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )`
	).run();

	const row = db.prepare('SELECT COUNT(*) as c FROM admins').get();
	if (row.c === 0) {
		const email = process.env.ADMIN_EMAIL || 'admin@example.com';
		const pass = process.env.ADMIN_PASSWORD || 'admin';
		const hash = bcrypt.hashSync(pass, 10);
		db.prepare('INSERT INTO admins (email, passwordHash, createdAt) VALUES (?, ?, ?)').run(email, hash, new Date().toISOString());
		console.log('Seeded admin ->', email);
	}

	const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
	if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports = { db, init };
