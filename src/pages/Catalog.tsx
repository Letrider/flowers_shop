import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SvgSearch } from "../components/Icons/Search/Search";
import { Navbar } from "../components/Navbars/NavbarHome/Navbar";
import { useFlowers } from "../hooks/useFlowersCatalog";
import { useInfiniteScroll } from "../hooks/useInfinityScroll";
import s from '../styles/Catalog.module.scss';
import { API } from "./Admin";

type CatalogColumns = 4 | 6 | 8;

const CATALOG_COLUMNS_KEY = 'catalog_columns';

const getInitialColumns = (): CatalogColumns => {
	if (typeof window === 'undefined') return 4;
	const storedValue = localStorage.getItem(CATALOG_COLUMNS_KEY);
	if (storedValue === '6') return 6;
	if (storedValue === '8') return 8;
	return 4;
};

const Catalog: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [columns, setColumns] = useState<CatalogColumns>(getInitialColumns);
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

	const hasNoFlowers = !loading && filteredFlowers.length === 0;

	const gradients = [
		'linear-gradient(#E5E6E1, #EDEDED)',
		'linear-gradient(#E1E0D7, #F1F1E8)',
		'linear-gradient(#EDEDED, #D8D8D8)',
		'linear-gradient(#F3E8E8, #E8F3F3)',
	];

	const updateColumns = (value: CatalogColumns) => {
		setColumns(value);
		if (typeof window !== 'undefined') {
			localStorage.setItem(CATALOG_COLUMNS_KEY, String(value));
		}
	};

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
					<div className={s['grid-controls']}>
						<span className={s['grid-controls-label']}>Сетка:</span>
						{([4, 6, 8] as CatalogColumns[]).map(value => (
							<button
								key={value}
								type="button"
								className={`${s['grid-option']} ${columns === value ? s['grid-option-active'] : ''}`}
								onClick={() => updateColumns(value)}
							>
								{value}
							</button>
						))}
					</div>
				</div>

				<div className={`${s.catalog} ${s[`catalog--${columns}`]}`}>
					<AnimatePresence>
						{hasNoFlowers && (
							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.3 }}
								className={s['empty-state']}
							>
								<h2 className={s['empty-state-title']}>В каталоге пока нет товаров</h2>
								<p className={s['empty-state-subtitle']}>Попробуйте изменить запрос или загляните чуть позже</p>
							</motion.div>
						)}

						{filteredFlowers?.map((flower, index) => {
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
									<h1 className={s['flower-subName']}>{flower.subName}</h1>
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
