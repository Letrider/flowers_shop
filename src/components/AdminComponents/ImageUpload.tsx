import React from 'react';
import { API } from "../../pages/Admin";

type Props = {
	image?: string;
	onUpload: (file: File) => void;
};

const ImageUpload: React.FC<Props> = ({ image, onUpload }) => {
	return (
		<label>
			Изображение
			<div className="images-row">
				{image && (
					<div className="thumb featured">
						<img src={API(image)} alt="" />
					</div>
				)}
				<label className="upload-btn">
					+
					<input
						type="file"
						accept="image/*"
						onChange={e => {
							if (e.target.files?.[0]) {
								onUpload(e.target.files[0]);
							}
						}}
					/>
				</label>
			</div>
		</label>
	);
};

export default ImageUpload;
