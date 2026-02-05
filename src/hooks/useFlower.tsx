/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { API } from "../pages/Admin";
import type { FlowerData } from "../types/flower";

export const useFlower = (slug?: string) => {
	const [flower, setFlower] = useState<FlowerData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		setLoading(true);

		fetch(API(`/api/products/by-slug/${slug}`))
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

