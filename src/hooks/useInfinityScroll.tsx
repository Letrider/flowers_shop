import { useEffect, useRef } from 'react';

interface Props {
	loading: boolean;
	page: number;
	totalPages: number;
	onLoadMore: () => void;
}

export const useInfiniteScroll = ({ loading, page, totalPages, onLoadMore }: Props) => {
	const lastTriggeredPageRef = useRef<number | null>(null);

	useEffect(() => {
		const threshold = 300;

		const handleScroll = () => {
			const scrollBottom = window.innerHeight + window.scrollY;
			const pageHeight = document.documentElement.scrollHeight;
			const isNearBottom = scrollBottom >= pageHeight - threshold;

			if (
				isNearBottom &&
				!loading &&
				page < totalPages &&
				lastTriggeredPageRef.current !== page
			) {
				lastTriggeredPageRef.current = page;
				onLoadMore();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loading, page, totalPages, onLoadMore]);
};
