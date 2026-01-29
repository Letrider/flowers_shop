const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_PATH = path.join(__dirname, 'data.json');

function readData() {
	if (!fs.existsSync(DATA_PATH)) return null;
	const raw = fs.readFileSync(DATA_PATH, 'utf-8');
	try {
		return JSON.parse(raw);
	} catch (err) {
		const bak = DATA_PATH + '.broken.' + Date.now();
		fs.copyFileSync(DATA_PATH, bak);
		console.error('Failed to parse data.json — backed up to', bak, err.message);
		return null;
	}
}

function writeData(data) {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function init() {
	let data = readData();
	if (!data) {
		data = { nextAdminId: 1, nextProductId: 1, admins: [], products: [] };
	}

	if (!data.admins || data.admins.length === 0) {
		const email = process.env.ADMIN_EMAIL || 'admin@example.com';
		const pass = process.env.ADMIN_PASSWORD || 'admin';
		const hash = bcrypt.hashSync(pass, 10);
		data.admins = [{ id: data.nextAdminId++, email, passwordHash: hash, createdAt: new Date().toISOString() }];
		console.log('Seeded admin ->', email);
	}

	if (data.admins && data.admins.length > 0) {
		const envPass = process.env.ADMIN_PASSWORD || 'admin';
		let changed = false;
		data.admins = data.admins.map(a => {
			if (!a.passwordHash || a.passwordHash === '__SEE_SERVER_ENV__') {
				const hash = bcrypt.hashSync(envPass, 10);
				changed = true;
				return { ...a, passwordHash: hash };
			}
			return a;
		});
		if (changed) writeData(data);
	}

	if (!data.products) data.products = [];

	writeData(data);

	const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
	if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
}

function getAdminByEmail(email) {
	const data = readData();
	return data.admins.find(a => a.email === email) || null;
}

function insertAdmin(email, passwordHash) {
	const data = readData();
	const admin = { id: data.nextAdminId++, email, passwordHash, createdAt: new Date().toISOString() };
	data.admins.push(admin);
	writeData(data);
	return admin;
}

function getAllProducts() {
	const data = readData();
	return data.products.slice().reverse();
}

function getProduct(id) {
	const data = readData();
	return data.products.find(p => Number(p.id) === Number(id)) || null;
}

function insertProduct(payload) {
	const data = readData();
	const prod = { id: data.nextProductId++, ...payload, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
	data.products.push(prod);
	writeData(data);
	return prod;
}

function updateProduct(id, payload) {
	const data = readData();
	const idx = data.products.findIndex(p => Number(p.id) === Number(id));
	if (idx === -1) return null;
	data.products[idx] = { ...data.products[idx], ...payload, updatedAt: new Date().toISOString() };
	writeData(data);
	return data.products[idx];
}

function deleteProduct(id) {
	const data = readData();
	const idx = data.products.findIndex(p => Number(p.id) === Number(id));
	if (idx === -1) return false;
	data.products.splice(idx, 1);
	writeData(data);
	return true;
}

module.exports = { init, getAdminByEmail, insertAdmin, getAllProducts, getProduct, insertProduct, updateProduct, deleteProduct };
