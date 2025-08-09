import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../form/Input';

export const TripName = () => {
	return (
		<View className='p-4 gap-2'>
			<Text className='text-2xl font-semibold'>Trip name</Text>
			<Text className='text-sm text-gray-500'>
				Give your trip a name to help you remember it later.
			</Text>
			<Input placeholder='Trip name' />
		</View>
	);
};
