import React from 'react';
import { FiEdit, FiLink, FiTrash2 } from 'react-icons/fi';
import type { FlowerData } from '../../hooks/useFlower';
import { API } from "../../pages/Admin";

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
				<div>
					<h1>{flower.name}</h1>
					<h1>{flower.subName}</h1>
				</div>
				<p><strong>Описание:</strong> {flower.description}</p>
				<p><strong>Цена:</strong> {flower.price} ₽</p>
				<p><strong>Уход:</strong> {flower.care}</p>
				<p><strong>Подкормки:</strong> {flower.fertilizers}</p>
				<p><strong>Информация:</strong></p>
				<ul>
					<li><strong>Виды:</strong> {flower.flowerInfo.types}</li>
					<li><strong>Уход:</strong> {flower.flowerInfo.care}</li>
					<li><strong>Подкормка:</strong> {flower.flowerInfo.feeding}</li>
					<li><strong>Польза:</strong> {flower.flowerInfo.benefits}</li>
				</ul>
			</div>
		</div>
	);
};

export default FlowerViewer;
