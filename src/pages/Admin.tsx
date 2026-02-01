import React, { useEffect, useState } from 'react';
import type { FlowerData } from "../hooks/useFlower";
import '../styles/admin.scss';

export const API = (path: string) => `${import.meta.env.VITE_API_BASE || ''}${path}`;

const emptyFlower: FlowerData = {
	id: 0,
	uniqueId: '',

	name: '',
	subName: '',
	description: '',
	price: 0,

	care: '',
	fertilizers: '',

	image: '',

	flowerInfo: {
		types: '',
		care: '',
		feeding: '',
		benefits: ''
	},

	moreInfo: {
		whatIs: '',
		interestFacts: '',
		howToLookAfter: ''
	},

	isPopular: false,
	isAvailable: true
};


const Admin = () => {
	const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [products, setProducts] = useState<FlowerData[]>([]);
	const [editing, setEditing] = useState<FlowerData | null>(null);
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

	const startEdit = (p: FlowerData | null) => {
		setEditing(p ? { ...p } : emptyFlower);
	};

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

		setEditing({ ...editing, image: url });
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
									<div key={p.id + '' + p.name + '' + p.price + ''} className="product-row" onClick={() => startEdit(p)}>
										<img src={p.image ? `${import.meta.env.VITE_API_BASE || ''}${p.image}` : '/'} alt="" />
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

									<label>Изображение
										<div className="images-row">
											{editing.image && (
												<div className="thumb featured">
													<img src={`${API(editing.image)}`} />
												</div>
											)}
											<label className="upload-btn">
												+
												<input type="file" onChange={handleFile} />
											</label>
										</div>
									</label>

									<h4>Информация о цветке</h4>

									<label>Виды
										<textarea
											value={editing.flowerInfo.types}
											onChange={e =>
												setEditing({
													...editing,
													flowerInfo: { ...editing.flowerInfo, types: e.target.value }
												})
											}
										/>
									</label>

									<label>Уход
										<textarea
											value={editing.flowerInfo.care}
											onChange={e =>
												setEditing({
													...editing,
													flowerInfo: { ...editing.flowerInfo, care: e.target.value }
												})
											}
										/>
									</label>

									<label>Прикормка
										<textarea
											value={editing.flowerInfo.feeding}
											onChange={e =>
												setEditing({
													...editing,
													flowerInfo: { ...editing.flowerInfo, feeding: e.target.value }
												})
											}
										/>
									</label>

									<label>Польза
										<textarea
											value={editing.flowerInfo.benefits}
											onChange={e =>
												setEditing({
													...editing,
													flowerInfo: { ...editing.flowerInfo, benefits: e.target.value }
												})
											}
										/>
									</label>

									<h4>Подробнее</h4>

									<label>Что это за цветок
										<textarea
											value={editing.moreInfo.whatIs}
											onChange={e =>
												setEditing({
													...editing,
													moreInfo: { ...editing.moreInfo, whatIs: e.target.value }
												})
											}
										/>
									</label>

									<label>Интересные факты
										<textarea
											value={editing.moreInfo.interestFacts}
											onChange={e =>
												setEditing({
													...editing,
													moreInfo: { ...editing.moreInfo, interestFacts: e.target.value }
												})
											}
										/>
									</label>

									<label>Как ухаживать
										<textarea
											value={editing.moreInfo.howToLookAfter}
											onChange={e =>
												setEditing({
													...editing,
													moreInfo: { ...editing.moreInfo, howToLookAfter: e.target.value }
												})
											}
										/>
									</label>

									<label className="checkbox">
										Популярное
										<input
											type="checkbox"
											checked={editing.isPopular}
											onChange={e => setEditing({ ...editing, isPopular: e.target.checked })}
										/>
									</label>

									<label className="checkbox">
										Есть в наличии
										<input
											type="checkbox"
											checked={editing.isAvailable}
											onChange={e => setEditing({ ...editing, isAvailable: e.target.checked })}
										/>
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
