import { Link } from "react-router-dom";
import s from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={s['navbar-container']}>
        <nav className={s['navbar']}>
        <Link to="/" className={s['link']}>
            Главная
        </Link>
        <Link to="/products" className={s['link']}>
            Товары
        </Link>

        <Link to="/" className={s['logo']}>
            Долина роз
        </Link>

        <Link to="/about" className={s['link']}>
            О нас
        </Link>
        <Link to="/contact" className={s['link']}>
            Контакты
        </Link>
        </nav>

        <div className={s['line']}/>
    </div>
  )
};
