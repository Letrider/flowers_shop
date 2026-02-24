import React from 'react';
import { FiEdit, FiLink, FiTrash2 } from 'react-icons/fi';
import { API } from "../../pages/Admin";
import type { FlowerData } from '../../types/flower';

type FlowerViewerProps = {
	flower: FlowerData;
	onEdit: () => void;
	onDelete: () => void;
	onCopyLink: () => void;
};

const FlowerViewer: React.FC<FlowerViewerProps> = ({ flower, onEdit, onDelete, onCopyLink }) => {
	return (
		<div className="flower-viewer">
			<div className="viewer-header">
				<div className="viewer-actions">
					<button className="btn small" onClick={onCopyLink}>
						<FiLink /> Скопировать ссылку
					</button>
					<button className="btn small primary" onClick={onEdit}>
						<FiEdit /> Редактировать
					</button>
					<button className="btn small danger" onClick={onDelete}>
						<FiTrash2 /> Удалить
					</button>
				</div>
			</div>
			<div className="viewer-body">
				{flower.image && <img src={API(flower.image)} alt={flower.name} className="viewer-image" />}
				<div className="viewer-info">
					<h1>{flower.name}</h1>
					<h2>{flower.subName}</h2>
					<p><strong>Описание:</strong> {flower.description}</p>
					<p><strong>Цена:</strong> {flower.price} ₽</p>
					<p><strong>Уход:</strong> {flower.care}</p>
					<p><strong>Подкормки:</strong> {flower.fertilizers}</p>

					<div className="viewer-badges">
						{flower.isPopular && <span className="badge popular">Популярное</span>}
						{flower.isAvailable ? (
							<span className="badge available">В наличии</span>
						) : (
							<span className="badge unavailable">Нет в наличии</span>
						)}
					</div>

					<h3>Информация о цветке</h3>
					<ul>
						<li><strong>Виды:</strong> {flower.flowerInfo.types}</li>
						<li><strong>Уход:</strong> {flower.flowerInfo.care}</li>
						<li><strong>Подкормка:</strong> {flower.flowerInfo.feeding}</li>
						<li><strong>Польза:</strong> {flower.flowerInfo.benefits}</li>
					</ul>

					<h3>Подробная информация</h3>
					<div className="more-info-section">
						<div>
							<strong>Что это за цветок:</strong>
							<p>{flower.moreInfo.whatIs}</p>
						</div>
						<div>
							<strong>Интересные факты:</strong>
							<p>{flower.moreInfo.interestFacts}</p>
						</div>
						<div>
							<strong>Как ухаживать:</strong>
							<p>{flower.moreInfo.howToLookAfter}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlowerViewer;
