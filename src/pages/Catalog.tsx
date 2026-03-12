import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { SvgSearch } from "../components/Icons/Search/Search";
import { Navbar } from "../components/Navbars/NavbarHome/Navbar";
import { useFlowers } from "../hooks/useFlowersCatalog";
import { useInfiniteScroll } from "../hooks/useInfinityScroll";
import s from '../styles/Catalog.module.scss';
import { API } from "./Admin";

type MobileCatalogColumns = 1 | 2 | 3;
type DesktopCatalogColumns = 4 | 6 | 8;
type CatalogColumns = MobileCatalogColumns | DesktopCatalogColumns;

const CATALOG_COLUMNS_KEY = 'catalog_columns';
const MOBILE_QUERY = '(max-width: 768px)';

const getIsMobile = (): boolean => {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(MOBILE_QUERY).matches;
};

const getInitialColumns = (isMobile: boolean): CatalogColumns => {
	if (typeof window === 'undefined') return isMobile ? 2 : 4;
	const storedValue = localStorage.getItem(CATALOG_COLUMNS_KEY);
	const parsedValue = Number(storedValue) as CatalogColumns;

	if (isMobile && [1, 2, 3].includes(parsedValue)) return parsedValue;
	if (!isMobile && [4, 6, 8].includes(parsedValue)) return parsedValue;

	return isMobile ? 2 : 4;
};

const Catalog: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isMobile, setIsMobile] = useState(getIsMobile);
	const [columns, setColumns] = useState<CatalogColumns>(() => getInitialColumns(getIsMobile()));
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

	const availableColumns = isMobile
		? ([1, 2, 3] as CatalogColumns[])
		: ([4, 6, 8] as CatalogColumns[]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia(MOBILE_QUERY);
		const handleChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		if (availableColumns.includes(columns)) return;
		const defaultColumns = isMobile ? 2 : 4;
		setColumns(defaultColumns);
		if (typeof window !== 'undefined') {
			localStorage.setItem(CATALOG_COLUMNS_KEY, String(defaultColumns));
		}
	}, [availableColumns, columns, isMobile]);

	const updateColumns = (value: CatalogColumns) => {
		if (!availableColumns.includes(value)) return;
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
						{availableColumns.map(value => (
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
									<div className={s['flower-texts']}>
										<h1 className={s['flower-name']}>{flower.name}</h1>
										{flower.subName && <h2 className={s['flower-subName']}>{flower.subName}</h2>}
									</div>
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
