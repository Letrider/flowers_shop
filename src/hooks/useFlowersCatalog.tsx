/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { API } from "../pages/Admin";
import { type FlowerData } from "../types/flower";

export const useFlowers = (page: number, limit: number) => {
	const [flowers, setFlower] = useState<FlowerData[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchFlowers = async () => {
			setLoading(true);
			try {
				const res = await fetch(API(`/api/products?page=${page}&limit=${limit}`));
				if (!res.ok) throw new Error('Flowers not found');
				const data = await res.json();

				setFlower(prev => {
					const newFlowers = data.data.filter((f: FlowerData) => !prev.some(p => p.id === f.id));
					return [...prev, ...newFlowers];
				});
				setTotal(data.total);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchFlowers();
	}, [page, limit]);

	return { flowers, loading, error, total };
};
