import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCartDropdown } from "../../../hooks/useCartDropdown";
import { CartDropdown } from "../../CartDropdown/CartDropdown";
import { SvgCart } from "../../Icons/Cart/Cart";
import { SvgOption } from "../../Icons/Option/Option";
import { Button } from "../../UI/Button/Button";
import s from './NavbarFlower.module.scss';

export const NavbarFlower = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const {
        isOpen: isCartOpen,
        open,
        toggle,
        cartRef,
    } = useCartDropdown();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className={s['navbar-container']}>

            <nav className={s['navbar']}>

                <div className={s['links']}>
                    <div className={s['links-desktop']}>
                        <Link to="/" className={s['link']}>Главная</Link>
                        <Link to="/catalog" className={s['link']}>Каталог</Link>
                        {/* <Link to="/contact" className={s['link']}>Контакты</Link>
                        <Link to="/about" className={s['link']}>О нас</Link> */}
                    </div>

                    <Button className={s['burger']} onClick={() => setIsOpen(true)}>
                        <SvgOption />
                    </Button>
                </div>


                <div className={s['logo-container']}>

                    <Link to="/" className={s['logo']}>
                        Долина роз
                    </Link>


                    <Button className={s['burger']} onClick={() => setIsOpen(true)}>
                        <SvgOption />
                    </Button>


                    <div className={s['buttons-desktop']} ref={cartRef}>
                        <div
                            className={s['button']}
                            onClick={open}
                        ><SvgCart /></div>
                        {isCartOpen && <CartDropdown />}
                    </div>
                </div>
            </nav>

            <div ref={menuRef} className={`${s['mobile-menu']} ${isOpen ? s['open'] : ''}`}>
                <header>
                    <button
                        className={s['close']}
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </header>

                <Link to="/" className={s['link']} onClick={() => setIsOpen(false)}>Главная<div className={s['line']}></div></Link>
                <Link to="/catalog" className={s['link']} onClick={() => setIsOpen(false)}>Каталог <div className={s['line']}></div></Link>
                <Link to="#" className={s['link']} onClick={() => {
                    setIsOpen(false);
                    toggle();
                }}>Открыть корзину
                    <div className={s['line']}></div>
                </Link>
            </div>

        </div>
    );
};
