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

function getHomeCarousel() {
	const data = readData();
	return data.homeCarousel || [];
}

function writeData(data) {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function init() {
	let data = readData();

	if (!data) {
		data = {
			nextAdminId: 1,
			nextProductId: 1,
			admins: [],
			products: [],
			homeCarousel: []
		};
	}

	if (!data.admins) data.admins = [];
	if (!data.products) data.products = [];
	if (!data.homeCarousel) data.homeCarousel = [];

	if (data.admins.length === 0) {
		const email = process.env.ADMIN_EMAIL || 'admin@example.com';
		const pass = process.env.ADMIN_PASSWORD || 'admin';
		const hash = bcrypt.hashSync(pass, 10);
		data.admins.push({
			id: data.nextAdminId++,
			email,
			passwordHash: hash,
			createdAt: new Date().toISOString()
		});
	}

	writeData(data);
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
	const prod = {
		id: data.nextProductId++,
		...payload,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};
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

function isUniqueSlug(slug) {
	const data = readData();
	return !data.products.some(p => p.uniqueId === slug);
}

function generateUniqueSlug(base) {
	let slug = base;
	let i = 2;

	while (!isUniqueSlug(slug)) {
		slug = `${base}-${i++}`;
	}

	return slug;
}

function getProductBySlug(slug) {
	const data = readData();
	return data.products.find(p => p.uniqueId === slug) || null;
}

module.exports = { init, getAdminByEmail, insertAdmin, getAllProducts, getProduct, insertProduct, updateProduct, deleteProduct, getHomeCarousel, generateUniqueSlug, getProductBySlug };
