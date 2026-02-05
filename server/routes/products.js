const express = require('express');
const router = express.Router();
const db = require('../db_impl');
const auth = require('../middleware/auth');
const { makeSlug } = require('../utils/slug');

router.get('/', (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 20;

	const allProducts = db.getAllProducts();
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;

	const paginatedProducts = allProducts.slice(startIndex, endIndex);

	res.json({
		total: allProducts.length,
		page,
		limit,
		data: paginatedProducts
	});
});

router.get('/:id', (req, res) => {
	const row = db.getProduct(req.params.id);
	if (!row) return res.status(404).json({ error: 'Not found' });

	res.json(row);
});


router.post('/', auth, (req, res) => {
	const {
		name,
		...payloadData
	} = req.body;

	const baseSlug = makeSlug(name);
	const uniqueId = db.generateUniqueSlug(baseSlug);

	const payload = {
		...payloadData,
		name,
		uniqueId,
	};

	const prod = db.insertProduct(payload);

	res.json(prod);
});


router.put('/:id', auth, (req, res) => {
	const {
		...payload
	} = req.body;

	const prod = db.updateProduct(req.params.id, payload);
	if (!prod) return res.status(404).json({ error: 'Not found' });

	res.json(prod);
});

router.get('/by-slug/:slug', (req, res) => {
	const product = db.getProductBySlug(req.params.slug);
	if (!product) return res.status(404).json({ error: 'Not found' });

	res.json(product);
});

router.delete('/:id', auth, (req, res) => {
	const ok = db.deleteProduct(req.params.id);
	res.json({ ok });
});

module.exports = router;
