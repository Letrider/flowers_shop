export interface Product {
	id: number;
	name: string;
	description: string;
	care: string;
	fertilizers: string;
	images: string[];
	featuredImage?: string;
}

export interface ProductWithPrice extends Product {
	price: number;
}
