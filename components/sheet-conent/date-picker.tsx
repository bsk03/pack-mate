import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DishSheet = ({
	title,
	onSubmit,
}: {
	title: string;
	onSubmit: (time: Date | null) => void;

	isLoading?: boolean;
}) => {
	const [value, setValue] = useState<Date>(new Date());

	const submitAnwser = () => {
		onSubmit(value);
	};

	return (
		<>
			<Text className='h5-700 mx-auto'>{title}</Text>

			<View className='flex-row items-center justify-center'>
				{Platform.OS === 'ios' ? (
					<RNDateTimePicker
						onChange={(e, date) => date && setValue(date)}
						value={value}
						mode='date'
						display='spinner'
					/>
				) : (
					<DatePicker
						onDateChange={(date) => date && setValue(date)}
						mode='time'
						locale='en_GB'
						date={value}
						is24hourSource='locale'
					/>
				)}
			</View>
			<Button onPress={submitAnwser} title='Submit' />
		</>
	);
};

export default DishSheet;
