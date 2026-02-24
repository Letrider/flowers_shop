import React, { useEffect, useState } from 'react';
import { config, getFullUrl } from '../config/api';

type Product = {
	id: number;
	name: string;
	description?: string;
	price?: number;
	featuredImage?: string;
};

const API = (path: string) => `${config.apiUrl}${path}`;

const Products: React.FC = () => {
	const [items, setItems] = useState<Product[]>([]);

	useEffect(() => {
		void fetch(API('/api/products'))
			.then(res => {
				if (!res.ok) return null;
				return res.json();
			})
			.then(data => {
				if (!data) return;
				setItems(Array.isArray(data) ? data : data?.data || []);
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<div className="page products-page">
			<h1>Каталог цветов</h1>
			<div className="products-grid">
				{items.map(p => (
					<div key={p.id} className="product-card">
						{p.featuredImage && <img src={getFullUrl(p.featuredImage)} alt={p.name} />}
						<h3>{p.name}</h3>
						<p>{p.description}</p>
						<p className="price">{p.price} ₽</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
