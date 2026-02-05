/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

type CartDropdownContextType = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
	cartRef: React.RefObject<HTMLDivElement>;
};

const CartDropdownContext =
	createContext<CartDropdownContextType | null>(null);

export const CartDropdownProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const cartRef = useRef<HTMLDivElement>(null);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen(p => !p);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				cartRef.current &&
				!cartRef.current.contains(e.target as Node)
			) {
				close();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	return (
		<CartDropdownContext.Provider
			value={{ isOpen, open, close, toggle, cartRef }}
		>
			{children}
		</CartDropdownContext.Provider>
	);
};

export const useCartDropdown = () => {
	const ctx = useContext(CartDropdownContext);
	if (!ctx) {
		throw new Error(
			"useCartDropdown must be used inside CartDropdownProvider"
		);
	}
	return ctx;
};
