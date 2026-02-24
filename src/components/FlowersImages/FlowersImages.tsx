import s from './FlowersImages.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	images: string[];
}

export const FlowersImages = ({ images }: Props) => {
	const slicedImages = images.slice(0, 4);
	const slicedAfterImages = images.slice(4);

	return (
		<div className={s['flowers-images']}>

			<div className={s['flowers-images__container']}>
				{slicedImages.map((image, index) => (
					<img
						key={index}
						src={image}
						alt=""
						className={`${s['flowers-image']} ${s[`index${index}`]}`}
					/>
				))}
			</div>

			<div className={s['flowers-images__container']}>
				{slicedAfterImages.map((image, index) => {
					const globalIndex = index + 4;

					return (
						<img
							key={globalIndex}
							src={image}
							alt=""
							className={`${s['flowers-image']} ${s[`index${globalIndex}`]}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

