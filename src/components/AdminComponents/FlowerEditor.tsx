import React, { useCallback, useState } from "react";
import { FiSave } from 'react-icons/fi';
import { type FlowerData } from "../../types/flower";
import CheckboxField from "./CheckboxField";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";

type Props = {
	editing: FlowerData;
	updateEditing: <K extends keyof FlowerData>(key: K, value: FlowerData[K]) => void;
	updateNested: <K extends keyof FlowerData, N extends keyof FlowerData[K]>(
		key: K,
		nestedKey: N,
		value: FlowerData[K][N]
	) => void;
	uploadImage: (file: File) => Promise<string | null>;
};

const FlowerEditorComponent: React.FC<Props> = ({ editing, updateEditing, updateNested, uploadImage }) => {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = useCallback((): boolean => {
		const newErrors: Record<string, string> = {};
		if (!editing.name) newErrors.name = "Поле обязательно";
		if (!editing.subName) newErrors.subName = "Поле обязательно";
		if (!editing.fertilizers) newErrors.fertilizers = "Поле обязательно";
		if (!editing.image) newErrors.image = "Поле обязательно";

		const fi = editing.flowerInfo || {};
		if (!fi.types) newErrors.types = "Поле обязательно";
		if (!fi.care) newErrors.careInfo = "Поле обязательно";
		if (!fi.feeding) newErrors.feeding = "Поле обязательно";
		if (!fi.benefits) newErrors.benefits = "Поле обязательно";

		const mi = editing.moreInfo || {};
		if (!mi.whatIs) newErrors.whatIs = "Поле обязательно";
		if (!mi.interestFacts) newErrors.interestFacts = "Поле обязательно";
		if (!mi.howToLookAfter) newErrors.howToLookAfter = "Поле обязательно";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [editing]);

	return (
		<div className="editor-card">
			<div style={{ marginBottom: 16, fontSize: 12, color: '#6b7280' }}>
				<span style={{ color: 'red', marginRight: 4 }}>*</span>
				обязательные поля
			</div>
			<div className="editor-body">
				<FormField
					label="Название"
					required
					value={editing.name}
					onChange={v => updateEditing("name", v)}
					error={errors.name}
				/>
				<FormField
					label="Подназвание"
					required
					value={editing.subName}
					onChange={v => updateEditing("subName", v)}
					error={errors.subName}
				/>
				<FormField
					label="Описание"
					textarea
					value={editing.description}
					onChange={v => updateEditing("description", v)}
					error={errors.description}
				/>
				<div className="two-cols">
					<label className="price-field">
						<span>Цена (в рублях)</span>
						<div className={`price-input-wrap ${errors.price ? 'has-error' : ''}`}>
							<input
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								placeholder="Например, 2500"
								value={editing.price > 0 ? editing.price : ''}
								onChange={e => {
									const digitsOnly = e.target.value.replace(/\D/g, '');
									updateEditing("price", digitsOnly ? Number(digitsOnly) : 0);
								}}
							/>
						</div>
						{errors.price && <div style={{ color: 'red', marginTop: 4, fontSize: 12 }}>{errors.price}</div>}
					</label>
				</div>
				<FormField
					label="Удобрения"
					required
					value={editing.fertilizers}
					onChange={v => updateEditing("fertilizers", v)}
					error={errors.fertilizers}
				/>
				<ImageUpload
					required
					image={editing.image}
					onUpload={async file => {
						const url = await uploadImage(file);
						if (url) updateEditing("image", url);
					}}
				/>
				{errors.image && <div style={{ color: "red", marginTop: 4 }}>{errors.image}</div>}

				<h4>Информация о цветке</h4>
				<FormField
					label="Виды"
					required
					textarea
					value={editing.flowerInfo?.types || ""}
					onChange={v => updateNested("flowerInfo", "types", v)}
					error={errors.types}
				/>
				<FormField
					label="Уход"
					required
					textarea
					value={editing.flowerInfo?.care || ""}
					onChange={v => updateNested("flowerInfo", "care", v)}
					error={errors.careInfo}
				/>
				<FormField
					label="Подкормка"
					required
					textarea
					value={editing.flowerInfo?.feeding || ""}
					onChange={v => updateNested("flowerInfo", "feeding", v)}
					error={errors.feeding}
				/>
				<FormField
					label="Польза"
					required
					textarea
					value={editing.flowerInfo?.benefits || ""}
					onChange={v => updateNested("flowerInfo", "benefits", v)}
					error={errors.benefits}
				/>

				<h4>Подробнее</h4>
				<FormField
					label="Что это за цветок"
					required
					textarea
					value={editing.moreInfo?.whatIs || ""}
					onChange={v => updateNested("moreInfo", "whatIs", v)}
					error={errors.whatIs}
				/>
				<FormField
					label="Интересные факты"
					required
					textarea
					value={editing.moreInfo?.interestFacts || ""}
					onChange={v => updateNested("moreInfo", "interestFacts", v)}
					error={errors.interestFacts}
				/>
				<FormField
					label="Как ухаживать"
					required
					textarea
					value={editing.moreInfo?.howToLookAfter || ""}
					onChange={v => updateNested("moreInfo", "howToLookAfter", v)}
					error={errors.howToLookAfter}
				/>

				<h4>Настройки</h4>
				<CheckboxField
					label="Популярное"
					checked={editing.isPopular}
					onChange={v => updateEditing("isPopular", v)}
				/>
				<CheckboxField
					label="Есть в наличии"
					checked={editing.isAvailable}
					onChange={v => updateEditing("isAvailable", v)}
				/>

				<button
					className="btn primary"
					onClick={() => {
						if (validate()) {
							document.dispatchEvent(new CustomEvent("saveFlower"));
						}
					}}
					style={{ marginTop: 24, width: '100%', padding: '14px' }}
				>
					<FiSave /> Сохранить изменения
				</button>
			</div>
		</div>
	);
};

export default React.memo(FlowerEditorComponent);
