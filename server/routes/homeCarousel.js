const express = require('express');
const router = express.Router();
const db = require('../db_impl');

router.get('/', (req, res) => {
	const slides = db.getHomeCarousel();
	res.json(slides);
});

module.exports = router;
