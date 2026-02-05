import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SvgSearch } from "../components/Icons/Search/Search";
import { Navbar } from "../components/Navbars/NavbarHome/Navbar";
import { useFlowers } from "../hooks/useFlowersCatalog";
import { useInfiniteScroll } from "../hooks/useInfinityScroll";
import s from '../styles/Catalog.module.scss';
import { API } from "./Admin";

const Catalog: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const limit = 20;
	const { flowers, total, loading } = useFlowers(page, limit);

	const totalPages = Math.ceil(total / limit);

	useInfiniteScroll({
		loading,
		page,
		totalPages,
		onLoadMore: () => setPage(prev => prev + 1),
	});

	const filteredFlowers = useMemo(() => {
		if (!search.trim()) return flowers;
		return flowers.filter(f =>
			f.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [flowers, search]);

	const gradients = [
		'linear-gradient(#E5E6E1, #EDEDED)',
		'linear-gradient(#E1E0D7, #F1F1E8)',
		'linear-gradient(#EDEDED, #D8D8D8)',
		'linear-gradient(#F3E8E8, #E8F3F3)',
	];

	return (
		<div className={s.page}>
			<Navbar />
			<div className="main-content">
				<div className={s['search-container']}>
					<div className={s['search']}>
						<input
							className={s['search-input']}
							placeholder="Поиск.."
							type="text"
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<button className={s['search-button']}>
							<SvgSearch className={s['search-icon']} />
						</button>
					</div>
				</div>

				<div className={s.catalog}>
					<AnimatePresence>
						{filteredFlowers?.sort((a, b) => a.id - b.id).map((flower, index) => {
							const gradient = gradients[index % gradients.length];
							return (
								<motion.a
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, }}
									transition={{ duration: 0.3 }}
									href={`/flower/${flower.uniqueId}`}
									className={s.flower}
									key={flower.uniqueId}
									style={{ background: gradient }}
								>
									<img src={API(flower.image)} alt={flower.name} className={s['flower-image']} />
									<h1 className={s['flower-name']}>{flower.name}</h1>
									<div className={s['flower-blur']} />
								</motion.a>
							);
						})}
					</AnimatePresence>
				</div>

				{loading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
			</div>
		</div>
	);
};

export default Catalog;
