import { SafeAreaView, Text, View } from 'react-native';

import QuickActions from '@/components/home/quick-actions';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { LinearGradient } from 'expo-linear-gradient';

import { getTotalTrips, getTrips } from '@/api/api';
import { Upcoming } from '@/components/home/upcoming';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export default function TabTwoScreen() {
	const fetch = useCallback(async () => {
		try {
			const trips = await getTrips('limit=3');

			return trips;
		} catch (error) {
			console.log(error);
			return [];
		}
	}, []);

	const fetchTotalTrips = useCallback(async () => {
		try {
			console.log('fetchTotalTrips');
			const res = await getTotalTrips();
			console.log('res', res);
			return res;
		} catch (e) {
			return null;
		}
	}, []);

	const { data: trips, isLoading } = useQuery({
		queryKey: ['trips'],
		queryFn: fetch,
	});

	const { data: totalTrips } = useQuery({
		queryKey: ['totalTrips'],
		queryFn: fetchTotalTrips,
	});

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
				<QuickActions totalTrips={totalTrips} />
				<Upcoming trips={trips} isLoading={isLoading} />
			</View>
		</ParallaxScrollView>
	);
}
