import { getTrip, updateTripItem } from '@/api/api';
import { Button } from '@/components/form/Button';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { PackingItem } from '@/components/trip/packing-item';
import { TripActions } from '@/components/trip/trip-actions';
import { TripType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeftIcon, CheckCircleIcon } from 'phosphor-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Animated,
	FlatList,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthLayout() {
	const { id } = useLocalSearchParams();
	const [isUpdating, setIsUpdating] = useState<string | null>(null);
	const insets = useSafeAreaInsets();
	const { data: trip } = useQuery<TripType>({
		queryKey: ['trip', id],
		queryFn: () => getTrip(id as string),
	});
	const queryClient = useQueryClient();

	const { mutate: updateTripMutation, isPending } = useMutation({
		mutationFn: (itemId: string) => toggleTripItem(itemId),
		onSuccess: (data) => {
			console.log('onSuccess', data);
			queryClient.invalidateQueries({ queryKey: ['trip', id] });
		},
		onError: (error) => {
			console.log('onError', error);
		},
	});

	const toggleTripItem = async (itemId: string) => {
		setIsUpdating(itemId);
		const item = trip?.trip_items.find((item) => item.id === itemId);

		if (!item) {
			throw new Error(`Item with id ${itemId} not found`);
		}

		if (!trip) {
			throw new Error('Trip not found');
		}

		const response = await updateTripItem({
			itemId: item.id,
			tripId: trip.id,
			item: {
				isPackedForTrip: !item.isPackedForTrip,
				packedForTripAt: item.isPackedForTrip ? null : new Date().toISOString(),
			},
		});
		console.log('response', response);
		return response;
	};
	const totalPackedItems = useMemo(
		() => trip?.trip_items.filter((item) => item.isPackedForTrip).length || 0,
		[trip]
	);
	const percentage = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(percentage, {
			toValue: (+totalPackedItems || 0) / (trip?.trip_items.length || 0),
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [totalPackedItems, trip?.trip_items.length, percentage]);

	const progressWidth = percentage.interpolate({
		inputRange: [0, 1],
		outputRange: ['0%', '100%'],
	});

	console.log({
		totalPackedItems: (totalPackedItems || 0) / (trip?.trip_items.length || 0),
		totalPackedItems2: totalPackedItems,
		totalPackedItems3: trip?.trip_items.length,
	});

	console.log({ progressWidth });
	return (
		<View className='flex-1'>
			<ParallaxScrollView
				headerHeight={200}
				headerImage={
					<LinearGradient
						colors={['#3d7eff', '#743be8']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={{ height: 550 }}
					>
						<SafeAreaView className='mx-6 gap-4 '>
							<View className='flex-row items-center gap-5'>
								<TouchableOpacity onPress={() => router.back()}>
									<ArrowLeftIcon size={16} color='white' />
								</TouchableOpacity>
								<View className='gap-1'>
									<Text className='text-white text-2xl font-bold'>
										{trip?.name}
									</Text>
									<Text className='text-white font-medium'>
										{trip?.destination}
									</Text>
								</View>
							</View>
							<View className='flex-row items-center gap-2 justify-between'>
								{trip?.dateStart && trip?.dateEnd && (
									<Text className='text-white font-medium '>
										{format(new Date(trip?.dateStart), 'dd MMMM')} -{' '}
										{format(new Date(trip?.dateEnd), 'dd MMMM')}
									</Text>
								)}
								<Text className='text-white font-bold text-sm'>
									{totalPackedItems}/{trip?.trip_items.length}
								</Text>
							</View>

							<View className='h-2 rounded-lg bg-white/20'>
								<View
									className={`h-full bg-white rounded-lg  `}
									style={{
										width: `0%`,
									}}
								/>
							</View>
						</SafeAreaView>
					</LinearGradient>
				}
				headerBackgroundColor={{ dark: '#4c669f', light: '#3b5998' }}
			>
				<View className='relative z-10 -top-10   gap-4'>
					<TripActions />
					<View className=' '>
						<FlatList
							ListHeaderComponent={() => (
								<View className='mb-4'>
									<Text className='text-2xl font-bold'>Packing list</Text>
								</View>
							)}
							data={trip?.trip_items}
							contentContainerClassName='gap-2'
							renderItem={({ item }) => (
								<PackingItem item={item} onToggle={updateTripMutation} />
							)}
							scrollEnabled={false}
							onStartReached={() => {
								console.log('start reached');
							}}
							onEndReached={() => {
								console.log('end reached');
							}}
							onEndReachedThreshold={0.5}
						/>
					</View>
				</View>
			</ParallaxScrollView>
			{trip?.trip_items.every((item) => item.isPackedForTrip) && (
				<View style={{ marginBottom: insets.bottom, marginHorizontal: 16 }}>
					<Button onPress={() => {}}>
						<View className='flex-row items-center gap-2'>
							<CheckCircleIcon size={20} color='white' />
							<Text className='text-lg text-white'>Mark as packed</Text>
						</View>
					</Button>
				</View>
			)}
		</View>
	);
}
