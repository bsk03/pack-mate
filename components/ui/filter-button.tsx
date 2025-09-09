import { FunnelIcon } from 'phosphor-react-native';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../form/Button';

type Props = {
	filtersEnabled: boolean;
	onPress: () => void;
};

export const FilterButton = ({ filtersEnabled, onPress }: Props) => {
	return (
		<Button
			className='flex-row gap-2 relative aspect-square'
			variant='secondary'
			onPress={onPress}
		>
			<FunnelIcon size={18} />
			{filtersEnabled && (
				<View className='absolute bottom-0 -right-1 bg-blue-500 w-2 h-2 rounded-full'></View>
			)}
		</Button>
	);
};
