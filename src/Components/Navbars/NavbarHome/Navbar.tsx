import { Link } from "react-router-dom";
import s from './Navbar.module.scss';

export const Navbar = () => {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s['navbar-container']}>

            <nav className={s['navbar']}>

                <Link to="/" className={s['logo']}>
                    Долина роз
                </Link>
                {/* 
                <div className={s['links-desktop']}>
                    <div className={s['links']}>
                        <Link to="/" className={s['link']}>Главная</Link>
                        <Link to="/products" className={s['link']}>Каталог</Link>
                    </div>
                    <div className={s['links']}>
                        <Link to="/contact" className={s['link']}>Контакты</Link>
                        <Link to="/about" className={s['link']}>О нас</Link>
                    </div>
                </div> */}

                {/* <Button className={s['burger']} onClick={() => setIsOpen(true)}>
                    <SvgOption />
                </Button> */}

            </nav>

            <div className={s['line']} />
            {/* 
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
            </div> */}

        </div>
    );
};
