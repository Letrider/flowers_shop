import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiLink, FiTrash2 } from 'react-icons/fi';
import CarouselEditor from "../components/AdminComponents/CarouselEditor";
import FlowerEditor from "../components/AdminComponents/FlowerEditor";
import FlowerViewer from "../components/AdminComponents/FlowerViewer";
import { useToast } from "../components/AdminComponents/hooks/useToast";
import { config } from "../config/api";
import '../styles/admin.scss';
import { type FlowerData } from "../types/flower";

export const API = (path: string) => `${config.apiUrl}${path}`;

const authHeaders = (token: string | null) => ({
	'Content-Type': 'application/json',
	...(token ? { Authorization: `Bearer ${token}` } : {})
});

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

type ProductRowProps = {
	product: FlowerData;
	onSelect: (flower: FlowerData) => void;
	onCopyLink: (flower: FlowerData) => void;
	onDelete: (id: number) => void;
	apiBase: (path: string) => string;
	position: number;
};

const ProductRow = React.memo<ProductRowProps>(({ product, onSelect, onCopyLink, onDelete, apiBase, position }) => (
	<div className="product-row">
		<p>{position}</p>
		<div className="product-row-left" onClick={() => onSelect(product)}>
			<img src={product.image ? apiBase(product.image) : '/'} alt="" />
			<div className="product-info">
				<div className="name">{product.name}</div>
				<div className="price">{product.price} ₽</div>
			</div>
		</div>
		<div className="product-actions">
			<button className="btn small" onClick={() => onCopyLink(product)}><FiLink /></button>
			<button className="btn small danger" onClick={() => onDelete(product.id)}><FiTrash2 /></button>
		</div>
	</div>
));

const Admin = () => {
	const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [products, setProducts] = useState<FlowerData[]>([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [editing, setEditing] = useState<FlowerData | null>(null);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [isEditing, setIsEditing] = useState(false);
	const [search, setSearch] = useState('');
	const [activeTab, setActiveTab] = useState<'products' | 'carousel'>('products');

	const { success, error } = useToast();

	const login = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(API('/api/auth/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		if (!res.ok) return error('Ошибка логина');
		const { token } = await res.json();
		setToken(token);
		localStorage.setItem('admin_token', token);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('admin_token');
	};

	const limit = 20;
	const totalPages = Math.ceil(totalProducts / limit);

	const fetchProducts = useCallback(async (targetPage: number, reset = false) => {
		setLoading(true);
		try {
			const res = await fetch(API(`/api/products?page=${targetPage}&limit=${limit}`));
			if (!res.ok) throw new Error('Не удалось загрузить товары');
			const json = await res.json();
			const items: FlowerData[] = Array.isArray(json) ? json : json.data || [];
			const total = Number(json?.total) || 0;

			setTotalProducts(total);
			setProducts(prev => {
				if (reset) return items;

				const merged = [...prev, ...items];
				return merged.filter((item, index, arr) =>
					index === arr.findIndex(candidate => candidate.uniqueId === item.uniqueId)
				);
			});
		} finally {
			setLoading(false);
		}
	}, [limit]);

	const save = useCallback(async () => {
		if (!editing) return;
		const isEdit = Boolean(editing.id);
		const basePayload = {
			...editing,
			care: editing.flowerInfo?.care || editing.care
		};
		const { id, ...createPayload } = basePayload;
		void id;
		const payload = isEdit ? basePayload : createPayload;
		try {
			const res = await fetch(
				API(isEdit ? `/api/products/${editing.id}` : "/api/products"),
				{
					method: isEdit ? "PUT" : "POST",
					headers: authHeaders(token),
					body: JSON.stringify(payload)
				}
			);
			if (!res.ok) throw new Error("Ошибка");
			success(isEdit ? "Товар обновлен" : "Товар создан");
			setEditing(null);
			setPage(1);
			fetchProducts(1, true);
		} catch (e) {
			error("Не удалось сохранить товар: " + e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editing, token, fetchProducts]);

	const deleteProduct = useCallback(async (id: number) => {
		if (!token) return;
		if (!window.confirm("Удалить этот цветок?")) return;

		try {
			const res = await fetch(API(`/api/products/${id}`), {
				method: 'DELETE',
				headers: authHeaders(token)
			});
			if (!res.ok) throw new Error("Ошибка удаления");
			success("Товар удалён");
			setPage(1);
			fetchProducts(1, true);
			if (editing?.id === id) setEditing(null);
		} catch (e) {
			error("Не удалось удалить товар: " + e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, editing, fetchProducts]);

	useEffect(() => {
		if (!token) return;
		setPage(1);
		setProducts([]);
		fetchProducts(1, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		if (!token || page === 1) return;
		fetchProducts(page);
	}, [page, token, fetchProducts]);

	const handleProductsListScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
		if (activeTab !== 'products') return;
		if (search.trim()) return;
		if (loading) return;
		if (page >= totalPages) return;

		const target = event.currentTarget;
		const isNearBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 80;

		if (isNearBottom) {
			setPage(prev => prev + 1);
		}
	}, [activeTab, loading, page, search, totalPages]);

	useEffect(() => {
		const listener = () => save();
		document.addEventListener("saveFlower", listener);
		return () => document.removeEventListener("saveFlower", listener);
	}, [save]);

	const filteredProducts = useMemo(
		() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
		[products, search]
	);

	const handleCopyLink = useCallback((flower: FlowerData) => {
		navigator.clipboard.writeText(`${window.location.origin}/flower/${flower.uniqueId}`)
			.then(() => success('Ссылка скопирована!'))
			.catch(() => error('Не удалось скопировать'));
	}, [success, error]);

	const handleSelectFlower = useCallback((flower: FlowerData) => {
		setEditing(structuredClone(flower));
		setIsEditing(false);
	}, []);



	return (
		<div className="admin-root">
			{!token ? (
				<div className="login-panel">
					<h2>Вход в админ-панель</h2>
					<form onSubmit={login} className="login-form">
						<input
							placeholder="Email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<input
							placeholder="Пароль"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<button className="btn primary">Войти</button>
					</form>
				</div>
			) : (
				<div className="admin-shell">
					{/* Sidebar */}
					<aside className="sidebar">
						<div className="brand">Панель управления Администратора</div>

						<div className="tabs">
							<button
								className={`tab ${activeTab === 'products' ? 'active' : ''}`}
								onClick={() => setActiveTab('products')}
							>
								Товары
							</button>
							<button
								className={`tab ${activeTab === 'carousel' ? 'active' : ''}`}
								onClick={() => setActiveTab('carousel')}
							>
								Карусель
							</button>
						</div>

						{activeTab === 'products' && (
							<>
								<button className="btn" onClick={() => setEditing(structuredClone(emptyFlower))}>
									+ Добавить товар
								</button>

								<input
									className="search-input"
									placeholder="Поиск..."
									value={search}
									onChange={e => setSearch(e.target.value)}
								/>

								<div className="muted" style={{ marginBottom: 8 }}>
									Всего товаров в базе: {totalProducts}
								</div>

								<div className="products-list" onScroll={handleProductsListScroll}>
									{filteredProducts.map((p, index) => (
										<ProductRow
											key={p.uniqueId}
											product={p}
											onSelect={handleSelectFlower}
											onCopyLink={handleCopyLink}
											onDelete={deleteProduct}
											apiBase={API}
											position={index + 1}
										/>
									))}

									{loading && (
										<div className="muted" style={{ textAlign: 'center', padding: '8px 0' }}>
											Загрузка...
										</div>
									)}

									{!loading && filteredProducts.length === 0 && (
										<div className="muted" style={{ textAlign: 'center', padding: '8px 0' }}>
											Нет товаров
										</div>
									)}
								</div>
							</>
						)}

						<div className="sidebar-foot">
							<button className="btn danger" onClick={logout}>Выйти</button>
						</div>
					</aside>

					<section className="editor-panel">
						{activeTab === 'products' ? (
							editing ? (
								isEditing ? (
									<FlowerEditor
										editing={editing}
										updateEditing={(key, value) =>
											setEditing(prev => prev ? { ...prev, [key]: value } : prev)
										}
										updateNested={(key, nestedKey, value) =>
											setEditing(prev => prev ? { ...prev, [key]: { ...(prev[key] as object), [nestedKey]: value } } : prev)
										}
										uploadImage={async file => {
											const fd = new FormData();
											fd.append("image", file);
											const res = await fetch(API("/api/upload"), { method: "POST", body: fd });
											if (!res.ok) return null;
											const { url } = await res.json();
											return url as string;
										}}
									/>
								) : (
									<FlowerViewer
										flower={editing}
										onEdit={() => setIsEditing(true)}
										onDelete={() => deleteProduct(editing.id)}
										onCopyLink={() => {
											navigator.clipboard.writeText(`${window.location.origin}/flower/${editing.uniqueId}`)
												.then(() => success('Ссылка скопирована!'))
												.catch(() => error('Не удалось скопировать'));
										}}
									/>
								)
							) : (
								<div className="empty">Выберите товар или нажмите «Добавить товар»</div>
							)
						) : (
							<CarouselEditor token={token} />
						)}
					</section>
				</div>
			)}
		</div>
	);
};

export default Admin;
