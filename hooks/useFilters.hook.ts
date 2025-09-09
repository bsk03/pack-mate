import { useCallback, useMemo, useState } from 'react';
import { FilterOption } from '../components/sheet-conent/filters-sheet';

export interface UseFiltersProps {
	initialFilters: FilterOption[];
	onApply?: (filters: FilterOption[]) => void;
	onReset?: () => void;
}

export interface UseFiltersReturn {
	filters: FilterOption[];
	handleFilterChange: (filterId: string, value: boolean) => void;
	handleApply: (appliedFilters: FilterOption[]) => void;
	handleReset: () => void;
	updateFilters: (newFilters: FilterOption[]) => void;
	getActiveFilters: () => FilterOption[];
	getActiveFilterIds: () => string[];
	hasActiveFilters: boolean;
	toggleFilter: (filterId: string) => void;
	setFilterValue: (filterId: string, value: boolean) => void;
	clearAllFilters: () => void;
	getFilterValue: (filterId: string) => boolean;
}

export const useFilters = ({
	initialFilters,
	onApply,
	onReset,
}: UseFiltersProps): UseFiltersReturn => {
	const [filters, setFilters] = useState<FilterOption[]>(initialFilters);

	const handleFilterChange = useCallback((filterId: string, value: boolean) => {
		setFilters((prev) =>
			prev.map((filter) =>
				filter.id === filterId ? { ...filter, value } : filter
			)
		);
	}, []);

	const handleApply = useCallback(
		(appliedFilters: FilterOption[]) => {
			setFilters(appliedFilters);
			onApply?.(appliedFilters);
		},
		[onApply]
	);

	const handleReset = useCallback(() => {
		setFilters((prev) => prev.map((filter) => ({ ...filter, value: false })));
		onReset?.();
	}, [onReset]);

	const updateFilters = useCallback((newFilters: FilterOption[]) => {
		setFilters(newFilters);
	}, []);

	const getActiveFilters = useCallback(() => {
		return filters.filter((filter) => filter.value);
	}, [filters]);

	const getActiveFilterIds = useCallback(() => {
		return filters.filter((filter) => filter.value).map((filter) => filter.id);
	}, [filters]);

	const hasActiveFilters = useMemo(
		() => filters.some((filter) => filter.value),
		[filters]
	);

	const toggleFilter = useCallback((filterId: string) => {
		setFilters((prev) =>
			prev.map((filter) =>
				filter.id === filterId ? { ...filter, value: !filter.value } : filter
			)
		);
	}, []);

	const setFilterValue = useCallback((filterId: string, value: boolean) => {
		setFilters((prev) =>
			prev.map((filter) =>
				filter.id === filterId ? { ...filter, value } : filter
			)
		);
	}, []);

	const clearAllFilters = useCallback(() => {
		setFilters((prev) => prev.map((filter) => ({ ...filter, value: false })));
	}, []);

	const getFilterValue = useCallback(
		(filterId: string) => {
			const filter = filters.find((f) => f.id === filterId);
			return filter?.value ?? false;
		},
		[filters]
	);

	return {
		filters,
		handleFilterChange,
		handleApply,
		handleReset,
		updateFilters,
		getActiveFilters,
		getActiveFilterIds,
		hasActiveFilters,
		toggleFilter,
		setFilterValue,
		clearAllFilters,
		getFilterValue,
	};
};
