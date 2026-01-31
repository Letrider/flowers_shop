import React, { useEffect, useState } from 'react';

type Product = {
	id: number;
	name: string;
	description?: string;
	price?: number;
	featuredImage?: string;
};

const API = (path: string) => `${import.meta.env.VITE_API_BASE || ''}${path}`;

const Products: React.FC = () => {
	const [items, setItems] = useState<Product[]>([]);

	useEffect(() => { fetchProducts(); }, []);

	const fetchProducts = async () => {
		try {
			const res = await fetch(API('/api/products'));
			if (!res.ok) return;
			const data = await res.json();
			setItems(data);
		} catch (err) { console.error(err); }
	};

	return (
		<div className="page products-page">
			<h1>Каталог цветов</h1>
			<div className="products-grid">
				{items.map(p => (
					<div key={p.id} className="product-card">
						{p.featuredImage && <img src={`${import.meta.env.VITE_API_BASE || ''}${p.featuredImage}`} alt={p.name} />}
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
