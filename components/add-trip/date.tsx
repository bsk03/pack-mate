import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { Input } from '../form/Input';
import DatePickerSheet from '../sheet-conent/date-picker';
import { BottomSheetComponent } from '../ui/bottom-sheet';
import { InputWrapper } from './input-wrapper';

export const DateStep = () => {
	console.log('DateStep rendered');

	useEffect(() => {
		console.log('DateStep mounted/updated');
		return () => console.log('DateStep unmounted');
	});
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null);

	const { watch, setValue } = useFormContext();

	const handlePresentModalPress = useCallback((pickerType: 'start' | 'end') => {
		setPickerType(pickerType);
		console.log('pickerType', pickerType);
		setTimeout(() => {
			bottomSheetModalRef.current?.present();
		}, 100);
	}, []);

	const handleCloseModal = useCallback(() => {
		setPickerType(null);
		bottomSheetModalRef.current?.dismiss();
	}, []);

	const handleSetDate = useCallback(
		(date: Date) => {
			handleCloseModal();

			if (pickerType) {
				const targetUpdate = pickerType === 'start' ? 'dateStart' : 'dateEnd';
				setValue(targetUpdate, format(date, 'yyyy-MM-dd'));
			}
		},
		[pickerType, setValue, handleCloseModal]
	);

	return (
		<>
			<View className='flex-1'>
				<View className='p-4 gap-2'>
					<InputWrapper
						title='Date'
						description={
							<View className='flex-row items-center gap-2 justify-between w-full'>
								<Text className='text-sm text-gray-500'>
									When are you going?
								</Text>
								<TouchableOpacity
									onPress={() => {
										setValue('dateStart', '');
										setValue('dateEnd', '');
									}}
								>
									<Text className='text-blue-500'>Reset</Text>
								</TouchableOpacity>
							</View>
						}
						input={
							<Input
								placeholder='eg. 25 June 2025'
								value={
									watch('dateStart')
										? format(new Date(watch('dateStart')), 'dd MMMM yyyy')
										: ''
								}
								onPressIn={() => handlePresentModalPress('start')}
								editable={false}
							/>
						}
					/>

					{watch('dateStart') !== '' && (
						<InputWrapper
							description={
								<View className='flex-row items-center gap-2 justify-between w-full'>
									<Text className='text-sm text-gray-500'>
										When are you coming back?
									</Text>
									<TouchableOpacity onPress={() => setValue('dateEnd', '')}>
										<Text className='text-blue-500'>Reset</Text>
									</TouchableOpacity>
								</View>
							}
							input={
								<Input
									placeholder='eg. 25 June 2025'
									value={
										watch('dateEnd')
											? format(new Date(watch('dateEnd')), 'dd MMMM yyyy')
											: ''
									}
									onPressIn={() => handlePresentModalPress('end')}
									editable={false}
								/>
							}
						/>
					)}
				</View>
			</View>
			{pickerType && (
				<Portal>
					<BottomSheetComponent ref={bottomSheetModalRef} snapPoints={['40%']}>
						<DatePickerSheet
							onSubmit={(date) => {
								date && handleSetDate(date);
							}}
							minDate={new Date()}
							maxDate={
								watch('dateEnd') ? new Date(watch('dateEnd')) : undefined
							}
						/>
					</BottomSheetComponent>
				</Portal>
			)}
		</>
	);
};
