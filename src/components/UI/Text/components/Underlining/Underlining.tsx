
import s from './Underlining.module.scss';

interface Props {
	children: React.ReactNode,
	custom?: boolean;
}
export const Underlining = ({ children, custom = false }: Props) => {



	return (
		<span className={s['underline']}>
			<span>{children}

				{custom && <div className={s['underline-custom']} />}
			</span>
		</span>
	);
};
