import { getItems } from '@/api/api';
import { useItems } from '@/hooks/useItems.hook';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { ItemsList } from './items-list';

export const ClothesStep = () => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'clothes',
	});
	const [search, setSearch] = useState('');
	const { data: items, fetchNextPage } = useInfiniteQuery({
		queryKey: ['items', 'clothes'],
		queryFn: ({ pageParam = 1 }) =>
			getItems(`category=clothing&page=${pageParam}&limit=15`),
		getNextPageParam: (lastPage, pages) =>
			lastPage.length > 0 ? pages.length + 1 : undefined,
		initialPageParam: 1,
	});

	const { handleClick } = useItems({ fields, append, remove, control });

	return (
		<View className='flex-1'>
			<ItemsList
				title='Clothes'
				description='Select the clothes you want to bring'
				items={items?.pages.flat() || []}
				search={search}
				setSearch={setSearch}
				loadMore={() => {
					if (items?.pages.length) {
						fetchNextPage();
					}
				}}
				onClick={handleClick}
				selectedValues={fields}
			/>
		</View>
	);
};
