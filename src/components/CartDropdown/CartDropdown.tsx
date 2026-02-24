import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useCartDropdown } from "../../hooks/useCartDropdown";
import s from "./CartDropdown.module.scss";
import { Card } from "./components/Card";
import { SvgClose } from "../Icons/Close/Close";

export const CartDropdown = () => {
	const {
		items,
		totalPrice,
	} = useCart();
	const { isOpen, close, cartRef } = useCartDropdown();

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<>
			<div className={s['background']}></div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={s.cart}
						ref={cartRef}
						initial={{ x: "100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: "100%", opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					>
						<div className={s['cart-header']}>
							<h1 className={s['total-price']}>ОБЩАЯ СУММА ЗАКАЗА:</h1>
							<span className={s['total-price']}>{totalPrice} ₽</span>

							<h1 className={s['in-cart']}>В КОРЗИНЕ:</h1>
						
							<SvgClose className={s['close-icon']} onClick={close} />
						</div>

						{items.length > 0 ? (
							<ul className={s.list}>
								{items.map(item => (
									<Card key={item.id} item={item} />
								))}
							</ul>
						) : (
							<div className={s.empty}>
								<p>Корзина пуста</p>
							</div>
						)}

						<div className={s.footer}>
							<div className={s.total}>
								<span>ОБЩАЯ СУММА ЗАКАЗА:</span>
								<strong>{totalPrice} ₽</strong>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
