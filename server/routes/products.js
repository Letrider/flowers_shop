const express = require('express');
const router = express.Router();
const db = require('../db_impl');
const auth = require('../middleware/auth');
const { makeSlug } = require('../utils/slug');

router.get('/', (req, res) => {
	const rows = db.getAllProducts();

	res.json(
		rows.map(r => ({
			...r
		}))
	);
});

router.get('/:id', (req, res) => {
	const row = db.getProduct(req.params.id);
	if (!row) return res.status(404).json({ error: 'Not found' });

	res.json(row);
});


router.post('/', auth, (req, res) => {
	const {
		name,
		description,
		price,
		care,
		fertilizers,
		images,
		featuredImage
	} = req.body;

	const baseSlug = makeSlug(name);
	const uniqueId = db.generateUniqueSlug(baseSlug);

	const payload = {
		name,
		uniqueId,
		description: description || '',
		price: price || 0,
		care: care || '',
		fertilizers: fertilizers || '',
		images: JSON.stringify(images || []),
		featuredImage: featuredImage || ''
	};

	const prod = db.insertProduct(payload);

	res.json(prod);
});


router.put('/:id', auth, (req, res) => {
	const {
		name,
		description,
		price,
		care,
		fertilizers,
		images,
		featuredImage
	} = req.body;

	const payload = {
		name,
		description: description || '',
		price: price || 0,
		care: care || '',
		fertilizers: fertilizers || '',
		images: JSON.stringify(images || []),
		featuredImage: featuredImage || ''
	};

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
