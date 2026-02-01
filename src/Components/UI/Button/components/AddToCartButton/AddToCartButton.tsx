import { SvgCartSecond } from "../../../../Icons/CartSecond/CartSecond";
import { SvgUnion } from "../../../../Icons/CartSecond/components/Union/Union";
import s from './AddToCartButton.module.scss';
export const AddToCartButton = () => {
	return (
		<button className={s['add-to-cart']}>
			<h1>Добавить в корзину</h1>
			<SvgCartSecond className={s['cart']} />
			<SvgUnion className={s['union']} />
		</button>
	);
};
