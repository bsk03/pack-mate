import React from 'react';
import { Text, View } from 'react-native';

const Slide = ({
	item,
}: {
	item: { id: number; title: string; description: string; svg: React.FC };
}) => {
	return (
		<View className='items-center  gap-4'>
			<Text className='text-2xl font-bold text-center'>{item.title}</Text>
			<item.svg width={200} height={200} />
			<Text className='text-center text-lg'>{item.description}</Text>
		</View>
	);
};

export default Slide;
