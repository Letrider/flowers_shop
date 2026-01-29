import React, { useEffect, useState } from 'react';
import '../styles/admin.scss';

const API = (path: string) => `${import.meta.env.VITE_API_BASE || ''}${path}`;

type Product = {
	id?: number;
	name: string;
	description?: string;
	price?: number;
	care?: string;
	fertilizers?: string;
	images?: string[];
	featuredImage?: string;
};

const Admin = () => {
	const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [products, setProducts] = useState<Product[]>([]);
	const [editing, setEditing] = useState<Product | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => { if (token) fetchProducts(); }, [token]);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch(API('/api/products'));
			const data = await res.json();
			setProducts(data);
		} catch (err) {
			console.error(err);
		} finally { setLoading(false); }
	};

	const login = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(API('/api/auth/login'), {
			method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
		});
		if (!res.ok) return alert('Ошибка логина');
		const { token } = await res.json();
		setToken(token);
		localStorage.setItem('admin_token', token);
	};

	const logout = () => { setToken(null); localStorage.removeItem('admin_token'); };

	const startEdit = (p: Product | null) => setEditing(p ? { ...p } : { name: '', description: '', price: 0, care: '', fertilizers: '', images: [] });

	const save = async () => {
		if (!editing) return;
		const url = editing.id ? `/api/products/${editing.id}` : '/api/products';
		const method = editing.id ? 'PUT' : 'POST';
		const res = await fetch(API(url), {
			method,
			headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
			body: JSON.stringify(editing)
		});
		if (!res.ok) return alert('Ошибка сохранения');
		setEditing(null);
		fetchProducts();
	};

	const uploadImage = async (file: File) => {
		const fd = new FormData();
		fd.append('image', file);
		const res = await fetch(API('/api/upload'), { method: 'POST', body: fd });
		if (!res.ok) return alert('Ошибка загрузки');
		const { url } = await res.json();
		return url as string;
	};

	const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !editing) return;
		const url = await uploadImage(e.target.files[0]);
		if (!url) return;
		const imgs = editing.images ? [...editing.images, url] : [url];
		setEditing({ ...editing, images: imgs, featuredImage: imgs[0] });
	};

	return (
		<div className="admin-root">
			{!token ? (
				<div className="login-panel">
					<h2>Вход в админку</h2>
					<form onSubmit={login} className="login-form">
						<input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
						<input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
						<button className="btn primary" type="submit">Войти</button>
					</form>
				</div>
			) : (
				<div className="admin-shell">
					<aside className="sidebar">
						<div className="brand">Admin</div>
						<button className="btn" onClick={() => startEdit(null)}>+ Добавить товар</button>
						<div className="products-list">
							{loading ? <div className="muted">Загрузка...</div> : (
								products.map(p => (
									<div key={p.id} className="product-row" onClick={() => startEdit(p)}>
										<img src={p.featuredImage ? `${import.meta.env.VITE_API_BASE || ''}${p.featuredImage}` : '/'} alt="" />
										<div>
											<div className="name">{p.name}</div>
											<div className="price">{p.price} ₽</div>
										</div>
									</div>
								))
							)}
						</div>
						<div className="sidebar-foot">
							<button className="btn danger" onClick={logout}>Выйти</button>
						</div>
					</aside>

					<section className="editor-panel">
						{!editing ? (
							<div className="empty">Выберите товар или нажмите «Добавить товар»</div>
						) : (
							<div className="editor-card">
								<div className="editor-header">
									<h3>{editing.id ? 'Редактировать товар' : 'Новый товар'}</h3>
									<div className="editor-actions">
										<button className="btn" onClick={() => { setEditing(null); }}>Отмена</button>
										<button className="btn primary" onClick={save}>Сохранить</button>
									</div>
								</div>

								<div className="editor-body">
									<label>Название
										<input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
									</label>

									<label>Описание
										<textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
									</label>

									<div className="two-cols">
										<label>Цена
											<input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })} />
										</label>
										<label>Уход
											<input value={editing.care} onChange={e => setEditing({ ...editing, care: e.target.value })} />
										</label>
									</div>

									<label>Удобрения
										<input value={editing.fertilizers} onChange={e => setEditing({ ...editing, fertilizers: e.target.value })} />
									</label>

									<label>Изображения
										<div className="images-row">
											{(editing.images || []).map((src, i) => (
												<div key={i} className={`thumb ${editing.featuredImage === src ? 'featured' : ''}`}>
													<img src={`${import.meta.env.VITE_API_BASE || ''}${src}`} alt="" />
												</div>
											))}
											<label className="upload-btn">
												+
												<input type="file" onChange={handleFile} />
											</label>
										</div>
									</label>
								</div>
							</div>
						)}
					</section>
				</div>
			)}
		</div>
	);
};

export default Admin;
