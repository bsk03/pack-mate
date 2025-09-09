import { getItems } from '@/api/api';
import { useItems } from '@/hooks/useItems.hook';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ItemsList } from './items-list';

export const ElectronicsStep = () => {
	const [search, setSearch] = useState('');
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'electronics',
	});

	const { data: items, fetchNextPage } = useInfiniteQuery({
		queryKey: ['items', 'documents'],
		queryFn: ({ pageParam = 1 }) =>
			getItems(`category=electronics&page=${pageParam}&limit=15`),
		getNextPageParam: (lastPage, pages) =>
			lastPage.length > 0 ? pages.length + 1 : undefined,
		initialPageParam: 1,
	});
	const { handleClick } = useItems({ fields, append, remove, control });

	return (
		<>
			<ItemsList
				title='Electronics'
				description='Select the electronics you want to bring'
				items={items?.pages.flat() || []}
				onClick={handleClick}
				selectedValues={fields}
				search={search}
				setSearch={setSearch}
				loadMore={() => {
					if (items?.pages.length) {
						fetchNextPage();
					}
				}}
			/>
		</>
	);
};
