import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../../../../context/CartContext";
import { useCartDropdown } from "../../../../../hooks/useCartDropdown";
import type { FlowerData } from "../../../../../types/flower";
import { SvgCartSecond } from "../../../../Icons/CartSecond/CartSecond";
import { SvgUnion } from "../../../../Icons/CartSecond/components/Union/Union";
import s from "./AddToCartButton.module.scss";

type Props = {
	flower: FlowerData;
	quantity: number;
	onClick?: () => void;
};

export const AddToCartButton = ({ flower, quantity, onClick = () => { } }: Props) => {
	const { addToCart, items } = useCart();
	const { open } = useCartDropdown();

	const isInCart = items.some(item => item.id === flower.id);

	const handleClick = () => {
		if (!isInCart) {
			addToCart(
				{
					id: flower.id,
					uniqueId: flower.uniqueId,
					name: flower.name,
					price: flower.price,
					image: flower.image,
				},
				quantity
			);
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
			open();
		}

		onClick();
	};

	return (
		<motion.button
			className={s["add-to-cart"]}
			onClick={handleClick}
			whileTap={{ scale: 0.96 }}
		>
			<AnimatePresence mode="wait">
				<motion.h1
					key={isInCart ? "go" : "add"}
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.25 }}
				>
					{isInCart
						? "Перейти в корзину"
						: "Добавить в корзину"}
				</motion.h1>
			</AnimatePresence>

			<SvgCartSecond className={s.cart} />
			<SvgUnion className={s.union} />
		</motion.button>
	);
};
