import { useEffect } from 'react';

interface Props {
	loading: boolean;
	page: number;
	totalPages: number;
	onLoadMore: () => void;
}

export const useInfiniteScroll = ({ loading, page, totalPages, onLoadMore }: Props) => {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight / 2 &&
				!loading &&
				page < totalPages
			) {
				onLoadMore();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loading, page, totalPages, onLoadMore]);
};
