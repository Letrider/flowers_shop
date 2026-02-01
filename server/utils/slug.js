const slugify = require('slugify');

function makeSlug(text) {
	return slugify(text, {
		lower: true,
		strict: true,
		locale: 'ru'
	});
}

module.exports = { makeSlug };
