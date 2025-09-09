import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TripTile } from './trip-tile';

export const Upcoming = ({
	trips,
	isLoading,
}: {
	trips: any;
	isLoading: boolean;
}) => {
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (trips.length === 0) {
		return <Text>No trips found</Text>;
	}

	return (
		<View className='flex-1 gap-4'>
			<View className='flex-row justify-between items-center'>
				<Text className='text-lg font-bold'>Upcoming Trips</Text>
				<TouchableOpacity>
					<Text className='text-pm-primary'>View all</Text>
				</TouchableOpacity>
			</View>
			<View className='flex gap-2 flex-1'>
				{trips &&
					trips.map((trip: any) => {
						const date = new Date(trip.dateStart).toLocaleDateString();
						return (
							<TripTile
								key={trip.id}
								title={trip.name}
								city={trip.city}
								country={trip.country}
								date={date}
								packed={false}
								clickable
								id={trip.id}
							/>
						);
					})}
			</View>
		</View>
	);
};
