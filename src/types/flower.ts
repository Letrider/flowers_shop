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