import { AroundTheWorld, Checking, ToDoList } from '@/assets/svg';
import React, { useCallback, useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import Slide from './slide';

const slides = [
	{
		id: 1,
		title: 'Gdzie się wybierasz?',
		description:
			'Wystarczy, że powiesz dokąd i na jak długo — resztą zajmie się Pack Mate.',
		svg: AroundTheWorld,
	},
	{
		id: 2,
		title: 'Spersonalizowana lista pakowania',
		description:
			'Nasze AI dopasowuje listę rzeczy do Twojej podróży — niezależnie czy to camping, city break czy wyjazd służbowy.',
		svg: ToDoList,
	},
	{
		id: 3,
		title: 'Sprawdź, czy wszystko wróciło z Tobą',
		description:
			'Podczas powrotu aplikacja pomoże Ci upewnić się, że nic nie zostało w hotelu.',
		svg: Checking,
	},
];

const WelcomeCarousel = () => {
	const { width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length > 0 && viewableItems[0].index !== null) {
				setCurrentIndex(viewableItems[0].index);
			}
		},
		[]
	);

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	return (
		<View className=''>
			<FlatList
				data={slides}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				bounces={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				contentContainerStyle={{
					alignItems: 'center',
				}}
				style={{ width }}
				renderItem={({ item }) => (
					<View style={{ width, paddingHorizontal: 16 }}>
						<Slide item={item} />
					</View>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					gap: 8,
					paddingVertical: 20,
				}}
			>
				{slides.map((_, index) => (
					<View
						key={index}
						className={`w-2 h-2 rounded-full ${
							currentIndex === index ? 'bg-pm-primary' : 'bg-gray-300'
						}`}
					/>
				))}
			</View>
		</View>
	);
};

export default WelcomeCarousel;
