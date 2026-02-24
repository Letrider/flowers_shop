import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { API } from "../../pages/Admin";
import type { FlowerData } from "../../types/flower";
import { useToast } from "./hooks/useToast";

type CarouselSlide = {
	id?: number;
	uniqueId?: string;
	title: string;
	description?: string;
	care?: string;
	undercare?: string;
	image: string;
};

const authHeaders = (token: string | null) => ({
	'Content-Type': 'application/json',
	...(token ? { Authorization: `Bearer ${token}` } : {})
});

type Props = {
	token: string | null;
};

const CarouselEditor: React.FC<Props> = ({ token }) => {
	const [slides, setSlides] = useState<CarouselSlide[]>([]);
	const [products, setProducts] = useState<FlowerData[]>([]);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState('');
	const [editUniqueId, setEditUniqueId] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editCare, setEditCare] = useState('');
	const [editImage, setEditImage] = useState('');
	const [loading, setLoading] = useState(false);

	const { success, error } = useToast();

	const fetchSlides = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(API('/api/home-carousel'));
			const data = await res.json();
			setSlides(data);
		} catch (e) {
			console.error('Ошибка загрузки слайдов:', e);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchProducts = useCallback(async () => {
		try {
			const res = await fetch(API('/api/products'));
			const json = await res.json();
			setProducts(Array.isArray(json) ? json : json.data || []);
		} catch (e) {
			console.error('Ошибка загрузки товаров:', e);
		}
	}, []);

	useEffect(() => {
		if (token) {
			fetchSlides();
			fetchProducts();
		}
	}, [token, fetchSlides, fetchProducts]);

	const handleAdd = async () => {
		if (!editTitle || !editImage || !editUniqueId) {
			error('Заполните обязательные поля');
			return;
		}

		try {
			const res = await fetch(API('/api/home-carousel'), {
				method: 'POST',
				headers: authHeaders(token),
				body: JSON.stringify({
					title: editTitle,
					image: editImage,
					uniqueId: editUniqueId,
					description: editDescription,
					care: editCare
				})
			});
			if (!res.ok) throw new Error('Ошибка');
			success('Слайд добавлен');
			setEditTitle('');
			setEditUniqueId('');
			setEditDescription('');
			setEditCare('');
			setEditImage('');
			fetchSlides();
		} catch {
			error('Не удалось добавить слайд');
		}
	};

	const handleUpdate = async (index: number) => {
		if (!editTitle || !editImage || !editUniqueId) {
			error('Заполните обязательные поля');
			return;
		}

		try {
			const res = await fetch(API(`/api/home-carousel/${index}`), {
				method: 'PUT',
				headers: authHeaders(token),
				body: JSON.stringify({
					title: editTitle,
					image: editImage,
					uniqueId: editUniqueId,
					description: editDescription,
					care: editCare
				})
			});
			if (!res.ok) throw new Error('Ошибка');
			success('Слайд обновлен');
			setEditingIndex(null);
			setEditTitle('');
			setEditUniqueId('');
			setEditDescription('');
			setEditCare('');
			setEditImage('');
			fetchSlides();
		} catch {
			error('Не удалось обновить слайд');
		}
	};

	const handleDelete = async (index: number) => {
		if (!window.confirm('Удалить этот слайд?')) return;

		try {
			const res = await fetch(API(`/api/home-carousel/${index}`), {
				method: 'DELETE',
				headers: authHeaders(token)
			});
			if (!res.ok) throw new Error('Ошибка');
			success('Слайд удалён');
			fetchSlides();
		} catch {
			error('Не удалось удалить слайд');
		}
	};

	const handleUploadImage = async (file: File) => {
		const fd = new FormData();
		fd.append('image', file);
		try {
			const res = await fetch(API('/api/upload'), { method: 'POST', body: fd });
			if (!res.ok) throw new Error('Ошибка загрузки');
			const { url } = await res.json();
			setEditImage(url);
			success('Изображение загружено');
		} catch {
			error('Не удалось загрузить изображение');
		}
	};

	const startEdit = (index: number) => {
		const slide = slides[index];
		setEditingIndex(index);
		setEditTitle(slide.title);
		setEditUniqueId(slide.uniqueId || '');
		setEditDescription(slide.description || '');
		setEditCare(slide.care || '');
		setEditImage(slide.image);
	};

	const cancelEdit = () => {
		setEditingIndex(null);
		setEditTitle('');
		setEditUniqueId('');
		setEditDescription('');
		setEditCare('');
		setEditImage('');
	};

	return (
		<div className="carousel-editor">
			<h2>Управление домашней каруселью</h2>

			{loading ? (
				<div className="muted">Загрузка...</div>
			) : (
				<>
					<div className="slides-list">
						{slides.map((slide, index) => (
							<div key={slide.id || index} className="slide-item">
								{editingIndex === index ? (
									<div className="slide-edit-form">
										<input
											type="text"
											placeholder="Заголовок *"
											value={editTitle}
											onChange={e => setEditTitle(e.target.value)}
											className="form-input"
										/>									<select
											value={editUniqueId}
											onChange={e => setEditUniqueId(e.target.value)}
											className="form-select"
										>
											<option value="">Выберите товар *</option>
											{products.map(p => (
												<option key={p.uniqueId} value={p.uniqueId}>{p.name}</option>
											))}
										</select>										<textarea
											placeholder="Описание (опционально)"
											value={editDescription}
											onChange={e => setEditDescription(e.target.value)}
											className="form-textarea"
											rows={3}
										/>
										<textarea
											placeholder="Виды (опционально)"
											value={editCare}
											onChange={e => setEditCare(e.target.value)}
											className="form-textarea"
											rows={3}
										/>
										<div className="image-upload-section">
											{editImage && (
												<img src={API(editImage)} alt="Preview" className="preview-image" />
											)}
											<label className="upload-label">
												<FiPlus />
												<span>{editImage ? 'Изменить изображение' : 'Загрузить изображение'}</span>
												<input
													type="file"
													accept="image/*"
													onChange={e => {
														if (e.target.files?.[0]) {
															handleUploadImage(e.target.files[0]);
														}
													}}
													style={{ display: 'none' }}
												/>
											</label>
										</div>
										<div className="slide-actions">
											<button className="btn primary small" onClick={() => handleUpdate(index)}>
												Сохранить
											</button>
											<button className="btn small" onClick={cancelEdit}>
												Отмена
											</button>
										</div>
									</div>
								) : (
									<>
										<img src={API(slide.image)} alt={slide.title} className="slide-thumbnail" />
										<div className="slide-info">
											<div className="slide-title">{slide.title}</div>										{slide.uniqueId && (
												<div className="slide-product">
													Товар: {products.find(p => p.uniqueId === slide.uniqueId)?.name || slide.uniqueId}
												</div>
											)}											{slide.description && (
												<div className="slide-description">{slide.description}</div>
											)}
											{slide.care && (
												<div className="slide-description">Виды: {slide.care}</div>
											)}
										</div>
										<div className="slide-actions">
											<button className="btn small" onClick={() => startEdit(index)}>
												Редактировать
											</button>
											<button className="btn small danger" onClick={() => handleDelete(index)}>
												<FiTrash2 />
											</button>
										</div>
									</>
								)}
							</div>
						))}
					</div>

					{editingIndex === null && (
						<div className="add-slide-form">
							<h3>Добавить новый слайд</h3>
							<input
								type="text"
								placeholder="Заголовок *"
								value={editTitle}
								onChange={e => setEditTitle(e.target.value)}
								className="form-input"
							/>
							<select
								value={editUniqueId}
								onChange={e => setEditUniqueId(e.target.value)}
								className="form-select"
							>
								<option value="">Выберите товар *</option>
								{products.map(p => (
									<option key={p.uniqueId} value={p.uniqueId}>{p.name}</option>
								))}
							</select>
							<textarea
								placeholder="Описание (опционально)"
								value={editDescription}
								onChange={e => setEditDescription(e.target.value)}
								className="form-textarea"
								rows={3}
							/>						<textarea
								placeholder="Виды (опционально)"
								value={editCare}
								onChange={e => setEditCare(e.target.value)}
								className="form-textarea"
								rows={3}
							/>							<div className="image-upload-section">
								{editImage && (
									<img src={API(editImage)} alt="Preview" className="preview-image" />
								)}
								<label className="upload-label">
									<FiPlus />
									<span>{editImage ? 'Изменить изображение' : 'Загрузить изображение *'}</span>
									<input
										type="file"
										accept="image/*"
										onChange={e => {
											if (e.target.files?.[0]) {
												handleUploadImage(e.target.files[0]);
											}
										}}
										style={{ display: 'none' }}
									/>
								</label>
							</div>
							<button className="btn primary" onClick={handleAdd} style={{ width: '100%' }}>
								<FiPlus /> Добавить слайд
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default CarouselEditor;
