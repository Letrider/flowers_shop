import { motion } from 'motion/react';
import { SvgArrowDown } from "../../../../Icons/ArrowDown/ArrowDown";
import s from './InformationButton.module.scss';

interface Props {
	id: string;
	title: string;
	info: string;
	isOpen: boolean;
	onToggle: (id: string) => void;
}

export const InformationButton = ({
	id,
	title,
	info,
	isOpen,
	onToggle,
}: Props) => {
	return (
		<div className={s['information']}>
			<div className={s['flower-button']} onClick={() => onToggle(id)}>
				<p>{title}</p>

				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
				>
					<SvgArrowDown />
				</motion.div>
			</div>

			{isOpen && info && (
				<motion.div
					className={s['flower-info']}
					transition={{ duration: 0.35, ease: 'easeOut' }}
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
				>
					<p>Описание</p>
					<span>{info}</span>
				</motion.div>
			)}
		</div>
	);
};
