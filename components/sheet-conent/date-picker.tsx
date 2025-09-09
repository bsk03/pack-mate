import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button } from '../form/Button';

const DishSheet = ({
	title,
	onSubmit,
	minDate,
	maxDate,
}: {
	title?: string;
	onSubmit: (time: Date | null) => void;
	isLoading?: boolean;
	minDate?: Date;
	maxDate?: Date;
}) => {
	const [value, setValue] = useState<Date>(new Date());
	console.log('minDate', minDate);
	console.log('maxDate', maxDate);
	return (
		<>
			{title && <Text className='h5-700 mx-auto'>{title}</Text>}

			<View className='flex-row items-center justify-center'>
				{Platform.OS === 'ios' ? (
					<RNDateTimePicker
						onChange={(e, date) => date && setValue(date)}
						value={value}
						mode='date'
						display='spinner'
						minimumDate={minDate}
						maximumDate={maxDate}
					/>
				) : (
					<DatePicker
						onDateChange={(date) => date && setValue(date)}
						mode='time'
						locale='en_GB'
						date={value}
						is24hourSource='locale'
						minimumDate={minDate}
						maximumDate={maxDate}
					/>
				)}
			</View>
			<Button onPress={() => onSubmit(value)}>Submit</Button>
		</>
	);
};

export default DishSheet;
