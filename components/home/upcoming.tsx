import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TripTile } from './trip-tile';

export const Upcoming = () => {
	return (
		<View className='flex-1 gap-4'>
			<View className='flex-row justify-between items-center'>
				<Text className='text-lg font-bold'>Upcoming Trips</Text>
				<TouchableOpacity>
					<Text className='text-pm-primary'>View all</Text>
				</TouchableOpacity>
			</View>
			<View className='flex gap-2 flex-1'>
				<TripTile
					title='Trip to Paris'
					city='Paris'
					country='France'
					date='2025-08-01'
					packed={false}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
				<TripTile
					title='Hoooooolidayyyys!'
					city='London'
					country='UK'
					date='2025-08-01 - 2025-08-05'
					packed={true}
				/>
			</View>
		</View>
	);
};
