import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Input } from '../form/Input';
import { InputWrapper } from './input-wrapper';

export const LocationStep = () => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const {
		control,
		formState: { errors },
	} = useFormContext();
	return (
		<>
			<View className='flex-1'>
				<View className='p-4 gap-2'>
					<InputWrapper
						title='Location'
						description='Where are you going?'
						input={
							<Input
								control={control}
								name='location'
								placeholder='e.g. Split, Croatia'
							/>
						}
					/>
				</View>
			</View>
		</>
	);
};
