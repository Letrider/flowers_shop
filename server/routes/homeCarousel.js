const express = require('express');
const router = express.Router();
const db = require('../db_impl');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
	const slides = db.getHomeCarousel();
	res.json(slides);
});

router.post('/', auth, (req, res) => {
	const { title, image, uniqueId, description, care, undercare } = req.body;
	if (!title || !image) {
		return res.status(400).json({ error: 'Title and image are required' });
	}
	const slide = db.addHomeCarouselSlide({ title, image, uniqueId, description, care, undercare });
	res.json(slide);
});

router.put('/:index', auth, (req, res) => {
	const index = parseInt(req.params.index);
	const { title, image, uniqueId, description, care, undercare } = req.body;
	if (isNaN(index) || !title || !image) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	const updated = db.updateHomeCarouselSlide(index, { title, image, uniqueId, description, care, undercare });
	if (!updated) {
		return res.status(404).json({ error: 'Slide not found' });
	}
	res.json(updated);
});

router.delete('/:index', auth, (req, res) => {
	const index = parseInt(req.params.index);
	if (isNaN(index)) {
		return res.status(400).json({ error: 'Invalid index' });
	}
	const ok = db.deleteHomeCarouselSlide(index);
	res.json({ ok });
});

module.exports = router;
