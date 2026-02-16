import { config } from "../config/api";
import { type Product } from "../types/flower";

const API_URL = config.apiEndpoint;

export const productsApi = {
	async getAll(): Promise<Product[]> {
		const res = await fetch(`${API_URL}/products`);
		if (!res.ok) {
			throw new Error('Failed to fetch products');
		}
		return res.json();
	},
};
