import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext";
import { API } from "../../../pages/Admin";
import type { CartItem } from "../../../types/cart";
import { SvgTrash } from "../../Icons/Trash/Trash";
import s from "./Card.module.scss";

type Props = {
	item: CartItem;
};

export const Card = ({ item }: Props) => {
	const { removeFromCart, changeQuantity } = useCart();

	return (
		<motion.div
			className={s.card}
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			transition={{ duration: 0.25 }}
		>
			<div className={s['card-image']}>
				<img
					src={API(item.image)}
					alt={item.name}
					className={s.image}
				/>
			</div>

			<div className={s.info}>
				<div className={s['info-header']}>
					<p className={s.title}>{item.name}</p>
						<h1 className={s['item-price-mobile']}>
							Цена: {item.price * item.quantity} ₽
						</h1>
					<div className={s['right']}>
						<div className={s.controls}>
							<button
								onClick={() =>
									changeQuantity(item.id, item.quantity - 1)
								}
							>
								−
							</button>

							<span>{item.quantity}</span>

							<button
								onClick={() =>
									changeQuantity(item.id, item.quantity + 1)
								}
							>
								+
							</button>
						</div>
						<button
							className={s.remove}
							onClick={() => removeFromCart(item.id)}
						>
							<SvgTrash className={s['trash-icon']} />
						</button>
					</div>
				</div>
				<h1 className={s['item-price']}>
					Цена: {item.price * item.quantity} ₽
				</h1>
			</div>

			<div className={s['right-mobile']}>

			</div>
		</motion.div>
	);
};
