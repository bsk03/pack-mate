import { Button } from '@/components/form/Button';
import WelcomeCarousel from '@/components/welcome/welcome-carousel';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
	return (
		<SafeAreaView className='flex-1 bg-pm-bg justify-between'>
			<Text className='text-center text-3xl font-bold mt-12 text-pm-primary'>
				Pack Mate
			</Text>
			<WelcomeCarousel />
			<View className='px-4 pb-4'>
				<Button
					variant='primary'
					onPress={() => router.push('/(auth)/sign-in')}
				>
					<Text className='text-white'>Zaczynamy</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
