import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar() {
	const insets = useSafeAreaInsets();

	if (Platform.OS === 'ios') {
		return (
			<BlurView
				intensity={40}
				tint='light'
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 39 + insets.bottom,
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: -3,
					},
					shadowOpacity: 0.15,
					shadowRadius: 8,
				}}
			>
				<View className='absolute top-0 left-0 right-0 h-0.5 bg-gray-200' />
			</BlurView>
		);
	}

	return (
		<View
			className='absolute bottom-0 left-0 right-0 bg-white/90'
			style={{
				height: 49 + insets.bottom,
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: -2,
				},
				shadowOpacity: 0.05,
				shadowRadius: 8,
				elevation: 5,
			}}
		>
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 0.5,
					backgroundColor: 'rgba(0,0,0,0.1)',
				}}
			/>
		</View>
	);
}
