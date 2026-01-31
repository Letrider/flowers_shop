import { useEffect, useState } from 'react';
import { API } from "../pages/Admin";

export interface HomeSlide {
	id: number;
	title: string;
	description: string;
	care: string;
	undercare: string;
	image: string;
}

export const useHomeCarousel = () => {
	const [slides, setSlides] = useState<HomeSlide[]>([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetch(API('/api/home-carousel'))
			.then(res => res.json())
			.then(data => {
				setSlides(data);
				setIndex(0);
			});
	}, []);

	const next = () => {
		if (!slides.length) return;
		setIndex(i => (i + 1) % slides.length);
	};

	const prev = () => {
		if (!slides.length) return;
		setIndex(i => (i - 1 + slides.length) % slides.length);
	};

	return {
		slide: slides.length ? slides[index] : null,
		next,
		prev
	};
};

