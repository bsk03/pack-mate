import { useState } from 'react';

type UsePagesReturn = {
	page: number;
	nextPage: () => void;
	prevPage: () => void;
	isNextPage: boolean;
	isPrevPage: boolean;
};

export const usePages = (totalPages: number): UsePagesReturn => {
	const [page, setPage] = useState(1);

	const nextPage = () => {
		if (page < totalPages) {
			setPage((prev) => prev + 1);
		}
	};

	const prevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	};

	console.log('page', page);
	console.log('totalPages', totalPages);

	return {
		page,
		nextPage,
		prevPage,
		isNextPage: totalPages !== page,
		isPrevPage: page === 1,
	};
};
