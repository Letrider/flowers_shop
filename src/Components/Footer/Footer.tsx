import s from './Footer.module.scss';

export const Footer = () => {
	return (
		<footer className={s['footer']}>
			<nav>
				<a href="/">Главная</a>
				{/* <a href="/catalog">Каталог</a>
				<a href="/contacts">Контакты</a> */}
			</nav>
			<h1 className={s['phone-number']}>+7 800 555-16-62</h1>
			<p className={s['address']}>ул. Генерала Омарова, 141, Махачкала, Респ. Дагестан, Россия, 367010</p>
			<div className={s['socials']}>
				<a href="https://instagram.com/dolinaroz05" target="_blank">
					<img className={s['icon']} src="/socials/Whatsapp.svg" alt="" />
				</a>
			</div>
			<img className={s['map']} src="http://localhost:4000/uploads/map/map.png" alt="" />
			<h1 className={s['logo-text']}>Долина роз</h1>
			<div className={s['underfooter']}>
				<div className={s['politics']}>
					<span>Политика конфиденциальности</span>
					<span>Копирайт Долина роз</span>
				</div>
				<div className={s['payments']}>
					<img className={s['payments-image']} src="/payments.png" alt="" />
					<img className={s['flower-image']} src="/flowerfooter.png" alt="" />
				</div>
			</div>
		</footer>
	);
};
