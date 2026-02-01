export interface Product {
	id: number;
	name: string;
	description: string;
	care: string;
	fertilizers: string;
	image: string;
	featuredImage?: string;
}

export interface ProductWithPrice extends Product {
	price: number;
}
