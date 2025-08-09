import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Text, View } from 'react-native';
import { Input } from '../form/Input';

export const LocationStep = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<>
			<View className='flex-1'>
				<View className='p-4 gap-2'>
					<Text className='text-2xl font-semibold'>Location</Text>
					<Text className='text-sm text-gray-500'>Where are you going?</Text>
					<Input placeholder='e.g. Split, Croatia' />
				</View>
			</View>
		</>
	);
};
