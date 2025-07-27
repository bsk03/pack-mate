import { SafeAreaView, Text, View } from 'react-native';

import QuickActions from '@/components/home/quick-actions';
import { Upcoming } from '@/components/home/upcoming';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabTwoScreen() {
	return (
		<ParallaxScrollView
			headerImage={
				<LinearGradient
					colors={['#3d7eff', '#743be8']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{ height: 150 }}
				>
					<SafeAreaView className='mx-6 gap-2'>
						<Text className='text-white text-2xl font-bold'>Pack mate</Text>
						<Text className='text-white '>
							Never forget anything on your travels
						</Text>
					</SafeAreaView>
				</LinearGradient>
			}
			headerBackgroundColor={{ dark: '#4c669f', light: '#3b5998' }}
		>
			<View className='relative z-10 -top-10 gap-4'>
				<QuickActions />
				<Upcoming />
			</View>
		</ParallaxScrollView>
	);
}
