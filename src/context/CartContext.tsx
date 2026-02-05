/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { CartItem } from "../types/cart";

type CartContextType = {
	items: CartItem[];
	addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
	removeFromCart: (id: number) => void;
	changeQuantity: (id: number, qty: number) => void;
	clearCart: () => void;
	totalCount: number;
	totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode; }> = ({
	children,
}) => {
	const [items, setItems] = useState<CartItem[]>(() => {
		const stored = localStorage.getItem("cart");
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (
		item: Omit<CartItem, "quantity">,
		qty = 1
	) => {
		setItems(prev => {
			const existing = prev.find(i => i.id === item.id);

			if (existing) {
				return prev.map(i =>
					i.id === item.id
						? { ...i, quantity: i.quantity + qty }
						: i
				);
			}

			return [...prev, { ...item, quantity: qty }];
		});
	};

	const removeFromCart = (id: number) => {
		setItems(prev => prev.filter(i => i.id !== id));
	};

	const changeQuantity = (id: number, qty: number) => {
		setItems(prev =>
			prev.map(i =>
				i.id === id
					? { ...i, quantity: Math.max(1, qty) }
					: i
			)
		);
	};

	const clearCart = () => setItems([]);

	const totalCount = useMemo(
		() => items.reduce((sum, i) => sum + i.quantity, 0),
		[items]
	);

	const totalPrice = useMemo(
		() => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
		[items]
	);

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				changeQuantity,
				clearCart,
				totalCount,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error("useCart must be used inside CartProvider");
	}
	return ctx;
};
