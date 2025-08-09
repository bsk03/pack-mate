import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { CustomTabBar } from '@/components/ui/CustomTabBar';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
	GlobeHemisphereEastIcon,
	House,
	UserIcon,
} from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#3a86ff',
				tabBarInactiveTintColor: '#94a3b8',
				headerShown: false,

				tabBarBackground: () => <CustomTabBar />,
				tabBarStyle: Platform.select({
					ios: {
						position: 'absolute',
						backgroundColor: 'transparent',
						paddingTop: 8,
						height: 39 + insets.bottom,
					},
					default: {
						position: 'absolute',
						backgroundColor: 'transparent',
						elevation: 0,
						paddingTop: 8,
					},
				}),
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: '',
					tabBarIcon: ({ color, focused }) => (
						<House
							size={24}
							color={color}
							weight='regular'
							style={{
								transform: [{ scale: focused ? 1.1 : 1 }],
							}}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: '',
					tabBarIcon: ({ color, focused }) => (
						<GlobeHemisphereEastIcon
							size={24}
							color={color}
							weight='regular'
							style={{
								transform: [{ scale: focused ? 1.1 : 1 }],
							}}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: '',
					tabBarIcon: ({ color, focused }) => (
						<UserIcon
							size={24}
							color={color}
							weight='regular'
							style={{
								transform: [{ scale: focused ? 1.1 : 1 }],
							}}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
