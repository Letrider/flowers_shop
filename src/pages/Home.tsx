import { AnimatePresence, motion } from "motion/react";
import { HomeButton } from '../components/HomeButton/HomeButton';
import { Navbar } from "../Components/Navbars/NavbarHome/Navbar";
import { SmartUnderlinedText } from "../components/SmartUnderliningText/SmartUnderliningText";
import { CarouselButton } from "../components/UI/Button/components/CarouselButton/CarouselButton";
import { useHomeCarousel } from '../hooks/useHomeCarousel';
import s from '../styles/home.module.scss';

const Home = () => {
	const { next, prev, slide } = useHomeCarousel();

	if (!slide) return <div>Загрузка</div>;

	return (
		<div className={s['home-page']}>
			<Navbar />

			<div className={s['home']}>
				<div className={s['left']}>
					<AnimatePresence mode="wait">
						<motion.h1
							key={slide.id + '-text-title'}
							className={s['title']}
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>Описание</motion.h1>
					</AnimatePresence>

					<AnimatePresence mode="wait">
						<motion.p
							key={slide.id + '-text'}
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							{slide.description}
						</motion.p>
					</AnimatePresence>

					<AnimatePresence mode="wait">
						<motion.div
							className={s['buttons-container']}
							key={slide.id + '-buttons'}
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							<HomeButton link="/products" text="Уход за растением" />
							<HomeButton link="/products" text="Прикормка" />
						</motion.div>
					</AnimatePresence>
				</div>

				<div className={s['mid']}>
					<div className={s['image-container']}>
						<div className={s['circle']} />

						<AnimatePresence mode="wait">
							<motion.img
								key={slide.id + '-image'}
								src={slide.image}
								alt={slide.title}
								className={s['image']}
								initial={{ opacity: 0, scale: 0.9, x: 50 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								exit={{ opacity: 0, scale: 0.9, x: -50 }}
								transition={{ duration: 0.5 }}
							/>
						</AnimatePresence>

						<motion.p
							key={slide.id + '-text-mid-header'}
							className={s['title-mid-header']}
							initial={{ opacity: 0, scale: 0.9, y: -50 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 50 }}
							transition={{ duration: 1.2, ease: 'easeOut' }}
						>
							{slide.title.toUpperCase()}
						</motion.p>

						<div className={s['mid-bottom-carousel-buttons']}>
							<CarouselButton
								direction="left"
								className={s['leftButton']}
								onClick={prev}
								short
							/>
							<CarouselButton
								direction="right"
								className={s['rightButton']}
								onClick={next}
								short
							/>
						</div>

						<CarouselButton
							direction="left"
							className={s['leftButton']}
							onClick={prev}
						/>
						<CarouselButton
							direction="right"
							className={s['rightButton']}
							onClick={next}
						/>

					</div>
					<div className={s['mid-bottom-mobile']}>
						<HomeButton link="/products" text="Уход за растением" />
						<HomeButton link="/products" text="Прикормка" />
					</div>
					<div className={s['mid-bottom-description-mobile']}>
						<motion.p
							key={slide.id + '-text-mid-bottom-description'}
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							{slide.description}
						</motion.p>
					</div>
				</div>

				<div className={s['right']}>
					<AnimatePresence mode="wait">
						<motion.h1
							key={slide.id + '-title-care'}
							className={s['title']}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>Виды</motion.h1>
					</AnimatePresence>


					<AnimatePresence mode="wait">
						<motion.div
							className={s['text-first']}
							key={slide.id + '-care'}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							<p>
								<SmartUnderlinedText text={slide.care} />
							</p>
						</motion.div>
					</AnimatePresence>


					<AnimatePresence mode="wait">
						<motion.div
							key={slide.id + '-undercare'}
							className={s['text-second']}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 50 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
						>
							<p>{slide.undercare}</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div >
	);
};

export default Home;
