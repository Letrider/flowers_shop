import { AnimatePresence, motion } from 'motion/react';
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

			<AnimatePresence initial={false}>
				{isOpen && info && (
					<motion.div
						transition={{ duration: 0.3, ease: 'easeOut' }}
						initial={{ height: 0 }}
						animate={{ height: 'auto' }}
						exit={{ height: 0 }}
						style={{ overflow: 'hidden' }}
					>
						<motion.div
							className={s['flower-info']}
							transition={{ duration: 0.2, ease: 'easeOut' }}
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
						>
							<span>{info}</span>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
