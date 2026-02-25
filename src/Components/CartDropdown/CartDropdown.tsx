import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useCartDropdown } from "../../hooks/useCartDropdown";
import { SvgClose } from "../Icons/Close/Close";
import s from "./CartDropdown.module.scss";
import { Card } from "./components/Card";

export const CartDropdown = () => {
	const {
		items,
		totalPrice,
	} = useCart();
	const { close } = useCartDropdown();

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<>
			<div className={s['background']} onClick={close}></div>
			<div className={s.cart}>
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
			</div>
		</>
	);
};
