import { useItems } from '@/hooks/useItems.hook';
import { Item } from '@/schemas/new-trip.schema';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BlurView } from 'expo-blur';
import React, { RefObject } from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';
import { ItemsSection } from './items-section';

type Items = {
	clothes: Item[];
	documents: Item[];
	electronics: Item[];
};

type Props = {
	bottomSheetRef: RefObject<BottomSheetMethods | null>;
	items: Items;
};

const SheetBody = ({
	items,
	changeQuantity,
}: {
	items: Items;
	changeQuantity: (
		item: Item,
		action: 'increment' | 'decrement' | 'delete',
		category: 'documents' | 'electronics' | 'clothes'
	) => void;
}) => {
	const totalItems = Object.values(items).reduce(
		(acc, category) => acc + category.length,
		0
	);

	return (
		<View className='flex-1 bg-gray-50'>
			<View className=' px-4 py-6 pt-0  '>
				<Text className='text-center text-3xl font-bold  mb-2'>
					Your Packing List
				</Text>
				<Text className='text-center text-gray-500 text-base'>
					{totalItems} {totalItems === 1 ? 'item' : 'items'} to pack
				</Text>
			</View>

			<View className='flex-1'>
				<BottomSheetFlatList
					data={Object.keys(items)}
					renderItem={({ item: categoryKey }) => {
						const category = categoryKey as keyof Items;
						if (items[category].length === 0) return null;
						return (
							<ItemsSection
								key={categoryKey}
								items={items[category]}
								title={category}
								changeQuantity={changeQuantity}
							/>
						);
					}}
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export const ItemsSheet = ({ bottomSheetRef, items }: Props) => {
	const { control } = useFormContext();
	const { changeQuantity } = useItems({ control });
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={['8%', '90%']}
			enablePanDownToClose={false}
			containerStyle={{ zIndex: 100 }}
			index={0}
			backgroundStyle={{ backgroundColor: '#F9FAFB' }}
			handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
			backdropComponent={({ style, animatedIndex, animatedPosition }) => {
				return animatedIndex.value > 2 ? (
					<BlurView intensity={10} style={[style]}>
						<Text>{animatedIndex.value}</Text>
					</BlurView>
				) : null;
			}}
		>
			{changeQuantity && (
				<SheetBody items={items} changeQuantity={changeQuantity} />
			)}
		</BottomSheet>
	);
};
