import s from './FlowerMoreInformation.module.scss';

interface Props {
	title: string;
	info: string;
	type?: 'default' | 'paragraph';
}

export const FlowerMoreInformation = ({ title, info, type = 'default', ...props }: Props) => {

	if (type === 'paragraph') {
		return (
			<div className={s['flower-more']} {...props}>
				<div className={s['flower-more__info']}>{info}</div>
			</div>
		);
	}

	return (
		<div className={s['flower-more']} {...props}>
			<div className={s['flower-more__title']}>{title}</div>
			<div className={s['flower-more__info']}>{info}</div>
		</div>
	);
};
