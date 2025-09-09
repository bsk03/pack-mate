import { router } from 'expo-router';
import { CalendarIcon, MapPinIcon, PackageIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Tile } from './tile';

type Props = {
	title: string;
	city: string;
	country: string;
	date: string;
	packed: boolean;
	clickable?: boolean;
	id: string;
};

export const TripTile = ({
	title,
	city,
	country,
	date,
	packed,
	clickable = false,
	id,
}: Props) => (
	<Tile
		className=' gap-1'
		onPress={clickable ? () => router.push(`/trip/${id}`) : undefined}
	>
		<Text className='text-lg font-bold'>{title}</Text>
		<View className='flex-row gap-2 items-center text-sm text-gray-500'>
			<MapPinIcon size={16} color='#6c757d' />
			<Text className='text-pm-text-muted'>
				{city}, {country}
			</Text>
		</View>
		<View className='flex-row gap-2 items-center text-sm text-gray-500'>
			<CalendarIcon size={16} color='#6c757d' />
			<Text className='text-pm-text-muted'>{date}</Text>
		</View>
		<View className='gap-2'>
			<View className='flex-row justify-between items-center'>
				<View className='flex-row gap-2 items-center text-sm text-gray-500'>
					<PackageIcon size={16} color='#6c757d' />
					<Text className='text-pm-text-muted'>
						{packed ? 'Packed' : 'Packing Progress'}
					</Text>
				</View>
				<Text>12/12</Text>
			</View>
			<View className='w-full rounded-lg bg-pm-primary h-2' />
		</View>
	</Tile>
);
