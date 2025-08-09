import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { Input } from '../form/Input';
import DatePickerSheet from '../sheet-conent/date-picker';
import { BottomSheetComponent } from '../ui/bottom-sheet';

export const DateStep = () => {
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
					<Text className='text-2xl font-semibold'>Date</Text>
					<Text className='text-sm text-gray-500'>When are you going?</Text>
					<Input
						placeholder='eg. 25 June 2025'
						onPressIn={handlePresentModalPress}
						editable={false}
					/>
					<Text className='text-sm text-gray-500'>
						When are you going back?
					</Text>
					<Input
						placeholder='eg. 2 July 2025'
						onPressIn={handlePresentModalPress}
						editable={false}
					/>
				</View>
			</View>
			<Portal>
				<BottomSheetComponent ref={bottomSheetModalRef}>
					<DatePickerSheet
						title='Date'
						onSubmit={(date) => {
							console.log(date);
							bottomSheetModalRef.current?.dismiss();
						}}
						isLoading={false}
					/>
				</BottomSheetComponent>
			</Portal>
		</>
	);
};
