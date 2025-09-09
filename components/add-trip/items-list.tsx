import React from 'react';
import { FlatList, View } from 'react-native';
import { Input } from '../form/Input';
import { InputWrapper } from './input-wrapper';
import { ItemTile } from './item-tile';

type Props = {
	items: { id: string; name: string }[];
	onClick: (id: string, name: string) => void;
	selectedValues: any[];
	title: string;
	description: string;
	search: string;
	setSearch: (search: string) => void;
	loadMore: () => void;
};

export const ItemsList = ({
	items,
	onClick,
	selectedValues,
	title,
	description,
	search,
	setSearch,
	loadMore,
}: Props) => {
	return (
		<View className='flex-1 '>
			<View className='px-4 gap-2'>
				<InputWrapper
					title={title}
					description={description}
					input={
						<Input placeholder='Search' value={search} onChange={setSearch} />
					}
				/>
			</View>
			<FlatList
				data={items}
				className='flex-1 px-4'
				contentContainerStyle={{ flexGrow: 1 }}
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.5}
				onEndReached={loadMore}
				renderItem={({ item }) => (
					<ItemTile
						label={item.name}
						onPress={() => onClick(item.id, item.name)}
						checked={selectedValues.some((field) => field.itemId === item.id)}
					/>
				)}
			/>
		</View>
	);
};
