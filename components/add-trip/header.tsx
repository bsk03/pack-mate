import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Animated, Button, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const NewTripHeader = ({
	title,
	actualPage,
	totalPages,
	onNext,
	onPrevious,
	isValid,
}: {
	title: string;
	actualPage: number;
	totalPages: number;
	onNext: () => void;
	onPrevious: () => void;
	isValid: boolean;
}) => {
	const insets = useSafeAreaInsets();
	const percentage = React.useRef(new Animated.Value(0)).current;
	const { top } = insets;
	const height = top + 41;

	React.useEffect(() => {
		Animated.timing(percentage, {
			toValue: actualPage / totalPages,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [actualPage, totalPages, percentage]);

	const progressWidth = percentage.interpolate({
		inputRange: [0, 1],
		outputRange: ['0%', '100%'],
	});

	return (
		<BlurView
			intensity={10}
			tint='extraLight'
			className={`absolute top-0 left-0 right-0 z-10 h-[${height}px] pt-[59px]`}
		>
			<View className='px-4 flex-row items-center justify-between'>
				<Button
					title='Back'
					onPress={actualPage === 0 ? () => router.back() : onPrevious}
				/>
				<Text className='text-xl  font-semibold'>{title}</Text>
				<Button title='Next' onPress={onNext} disabled={!isValid} />
			</View>
			<View className='h-1 w-full bg-gray-300 rounded-full'>
				<Animated.View style={{ width: progressWidth }}>
					<LinearGradient
						colors={['#3d7eff', '#743be8']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={{ height: 4, width: '100%' }}
					/>
				</Animated.View>
			</View>
		</BlurView>
	);
};
