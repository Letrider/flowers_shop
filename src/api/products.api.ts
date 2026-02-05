import { type Product } from "../types/flower";

const API_URL = 'http://localhost:4000/api';

export const productsApi = {
	async getAll(): Promise<Product[]> {
		const res = await fetch(`${API_URL}/products`);
		if (!res.ok) {
			throw new Error('Failed to fetch products');
		}
		return res.json();
	},
};
