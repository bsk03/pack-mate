import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

import { AuthProvider, useAuth } from '@/context/auth-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import Toast, {
	BaseToastProps,
	ErrorToast,
	SuccessToast,
} from 'react-native-toast-message';

function RootLayoutNav() {
	const { user, loading } = useAuth();
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
	});

	useEffect(() => {
		if (!loading && user) {
			router.replace('/(app)/(tabs)/home');
		}
	}, [user, loading]);

	if (!loaded || loading) {
		return null;
	}

	const toastConfig = {
		success: (props: BaseToastProps) => (
			<View
				style={{
					zIndex: 9999999999999999,
					width: '100%',
					marginTop: 20,
				}}
			>
				<SuccessToast
					{...props}
					style={{
						backgroundColor: 'white',
						width: '80%',
						borderRadius: 50,
						height: 50,
						borderLeftColor: 'lime',
						marginHorizontal: 'auto',
					}}
				/>
			</View>
		),
		error: (props: BaseToastProps) => (
			<View style={{ width: '100%', zIndex: 9999999999999999, marginTop: 20 }}>
				<ErrorToast
					{...props}
					style={{
						backgroundColor: 'white',
						width: '80%',
						borderRadius: 50,
						height: 50,
						borderLeftColor: 'red',
						marginHorizontal: 'auto',
					}}
				/>
			</View>
		),
	};

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<Host>
						<Stack>
							<Stack.Screen name='index' options={{ headerShown: false }} />
							<Stack.Screen name='(auth)' options={{ headerShown: false }} />
							<Stack.Screen name='(app)' options={{ headerShown: false }} />
							<Stack.Screen name='+not-found' />
						</Stack>
						<StatusBar style='auto' />
					</Host>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
			<Toast config={toastConfig} />
		</ThemeProvider>
	);
}

export default function RootLayout() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RootLayoutNav />
			</QueryClientProvider>
		</AuthProvider>
	);
}
