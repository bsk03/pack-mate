import { router } from 'expo-router';
import {
	BagIcon,
	PlusIcon,
	SuitcaseRollingIcon,
	TrendUpIcon,
} from 'phosphor-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../form/Button';
import { Tile } from './tile';

export default function QuickActions({ totalTrips }: { totalTrips: number }) {
	return (
		<View className='gap-6'>
			<View className='border border-gray-300 rounded-lg p-4 gap-2 bg-white '>
				<Text className='font-bold text-lg'>Quick actions</Text>
				<View className='flex-row gap-2 flex-1'>
					<View className='flex-1'>
						<Button
							className='flex-row gap-2 flex-1 '
							variant='accent'
							onPress={() => router.push('/home/new-trip')}
						>
							<View className='flex-row gap-2 items-center'>
								<PlusIcon size={14} />
								<Text className='text-sm '>New trip</Text>
							</View>
						</Button>
					</View>
					<View className='flex-1 bg'>
						<Button className='flex-row gap-2 flex-1 ' variant='secondary'>
							<View className='flex-row gap-2 items-center'>
								<BagIcon size={14} />
								<Text className='text-sm '>View trips</Text>
							</View>
						</Button>
					</View>
				</View>
			</View>
			<View className='flex-row gap-2'>
				<Tile className='flex-row gap-2 items-center w-1/2 flex-1'>
					<View className='bg-pm-primary/20 p-2 rounded-lg '>
						<SuitcaseRollingIcon color='#3a86ff' size={24} />
					</View>
					<View>
						<Text className='text-2xl font-bold'>{totalTrips}</Text>
						<Text className='text-sm text-gray-500'>Total trips</Text>
					</View>
				</Tile>
				<Tile className='flex-row gap-2 items-center w-1/2'>
					<View className='bg-lime-500/10 p-2 rounded-lg '>
						<TrendUpIcon color='#84cc16' size={24} />
					</View>
					<View>
						<Text className='text-2xl font-bold'>95%</Text>
						<Text className='text-sm text-gray-500'>Avg Packed</Text>
					</View>
				</Tile>
			</View>
		</View>
	);
}
