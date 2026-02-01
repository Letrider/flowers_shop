import { useState } from "react";
import { Link } from "react-router-dom";
import { SvgOption } from "../../Icons/Option/Option";
import { Button } from "../../UI/Button/Button";
import s from './NavbarFlower.module.scss';

export const NavbarFlower = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s['navbar-container']}>

            <nav className={s['navbar']}>

                <div className={s['links']}>
                    <div className={s['links-desktop']}>
                        <Link to="/" className={s['link']}>Главная</Link>
                        {/* <Link to="/products" className={s['link']}>Каталог</Link>
                        <Link to="/contact" className={s['link']}>Контакты</Link>
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


                    {/* <div className={s['buttons-desktop']}>
                        <div className={s['button']}><SvgSearch /></div>
                        <div className={s['button']}><SvgCart /></div>
                    </div> */}

                </div>



            </nav>

            <div className={`${s['mobile-menu']} ${isOpen ? s['open'] : ''}`}>
                <header>
                    <button
                        className={s['close']}
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </header>

                <Link to="/" className={s['link']} onClick={() => setIsOpen(false)}>Главная<div className={s['line']}></div></Link>
                <Link to="/products" className={s['link']} onClick={() => setIsOpen(false)}>Каталог <div className={s['line']}></div></Link>
                <Link to="/contact" className={s['link']} onClick={() => setIsOpen(false)}>Контакты <div className={s['line']}></div></Link>
                <Link to="/about" className={s['link']} onClick={() => setIsOpen(false)}>О нас <div className={s['line']}></div></Link>
            </div>

        </div>
    );
};
