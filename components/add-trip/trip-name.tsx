import React from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Input } from '../form/Input';
import { InputWrapper } from './input-wrapper';

export const TripName = () => {
	const { control } = useFormContext();
	return (
		<View className='p-4 gap-2'>
			<InputWrapper
				title='Trip name'
				description='Give your trip a name to help you remember it later.'
				input={<Input control={control} name='name' placeholder='Trip name' />}
			/>
		</View>
	);
};
