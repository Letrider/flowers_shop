/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

export interface FlowerData {
	id: number;
	uniqueId: string;
	name: string;
	subName: string;
	description: string;
	price: number;
	care: string;
	fertilizers: string;
	image: string;
	flowerInfo: {
		types: string;
		care: string;
		feeding: string;
		benefits: string;
	};
	moreInfo: {
		whatIs: string;
		interestFacts: string;
		howToLookAfter: string;
	},
	isPopular: boolean;
	isAvailable: boolean;
}

export const useFlower = (slug?: string) => {
	const [flower, setFlower] = useState<FlowerData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		setLoading(true);

		fetch(`http://localhost:4000/api/products/by-slug/${slug}`)
			.then(res => {
				if (!res.ok) throw new Error('Flower not found');
				return res.json();
			})
			.then(data => setFlower(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [slug]);

	return { flower, loading, error };
};

