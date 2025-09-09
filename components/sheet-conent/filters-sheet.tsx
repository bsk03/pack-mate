import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Button } from '../form/Button';

type Props = {
	selectedFilter: string | null;
	onFilterSelect: (filterId: string) => void;
};

const filters = [
	{ id: 'unpacked', label: 'Unpacked items' },
	{ id: 'packed', label: 'Packed items' },
];

export const FiltersSheet = ({ selectedFilter, onFilterSelect }: Props) => {
	const [localSelectedFilter, setLocalSelectedFilter] = useState<string | null>(
		selectedFilter
	);

	const onLocalFilterSelect = useCallback((filterId: string) => {
		setLocalSelectedFilter(filterId);
	}, []);
	return (
		<View className='h-full justify-between gap-10'>
			<View className='flex-1 gap-4'>
				<Text className='text-2xl font-bold'>Show only</Text>
				<View className='gap-2'>
					{filters.map((filter) => (
						<View key={`${filter.id}-${localSelectedFilter}`}>
							<BouncyCheckbox
								fillColor='#3d7eff'
								key={filter.id}
								text={filter.label}
								textStyle={{ textDecorationLine: 'none' }}
								isChecked={localSelectedFilter === filter.id}
								onPress={() => onLocalFilterSelect(filter.id)}
							/>
						</View>
					))}
				</View>
			</View>
			<Button
				variant='accent'
				onPress={() => onFilterSelect(localSelectedFilter)}
			>
				Apply
			</Button>
		</View>
	);
};
