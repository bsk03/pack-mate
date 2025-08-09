import { useState } from 'react';

interface UsePagesReturn {
	page: number;
	nextPage: () => void;
	prevPage: () => void;
}

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

	return {
		page,
		nextPage,
		prevPage,
	};
};
