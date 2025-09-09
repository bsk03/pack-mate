import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PlusIcon } from 'phosphor-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { Button } from '../form/Button';
import { FiltersSheet } from '../sheet-conent/filters-sheet';
import { BottomSheetComponent } from '../ui/bottom-sheet';
import { FilterButton } from '../ui/filter-button';

type Props = {
	bottomSheetModalRef: React.RefObject<BottomSheetModal>;
	selectedFilter: string | null;
	handleFilterSelect: (filterId: string) => void;
};

export const TripActions = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleFilterSelect = (filterId: string) => {
		if (selectedFilter === filterId) {
			setSelectedFilter(null);
		} else {
			setSelectedFilter(filterId);
		}
		bottomSheetModalRef.current?.dismiss();
	};

	return (
		<View className='border border-gray-300 rounded-lg p-4 gap-2 bg-white '>
			<View className='flex-row gap-2 flex-1'>
				<View className='flex-1'>
					<Button
						className='flex-row gap-2 flex-1 '
						variant='accent'
						onPress={() => {}}
					>
						<View className='flex-row gap-2 items-center'>
							<PlusIcon size={14} />
							<Text className='text-sm '>Add item</Text>
						</View>
					</Button>
				</View>
				<FilterButton
					filtersEnabled={!!selectedFilter}
					onPress={handlePresentModalPress}
				/>
			</View>

			<Portal>
				<BottomSheetComponent ref={bottomSheetModalRef} snapPoints={['30%']}>
					<FiltersSheet
						selectedFilter={selectedFilter}
						onFilterSelect={handleFilterSelect}
					/>
				</BottomSheetComponent>
			</Portal>
		</View>
	);
};
