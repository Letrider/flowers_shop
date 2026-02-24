import { config } from "../config/api";
import type { FlowerData } from "../types/flower";

const API_URL = config.apiEndpoint;

export const productsApi = {
	async getAll(): Promise<FlowerData[]> {
		const res = await fetch(`${API_URL}/products`);
		if (!res.ok) {
			throw new Error('Failed to fetch products');
		}
		return res.json();
	},
};
