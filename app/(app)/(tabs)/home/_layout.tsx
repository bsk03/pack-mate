import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ headerShown: false }} />
			<Stack.Screen
				name='new-trip'
				options={{
					headerShown: false,
					presentation: 'fullScreenModal',
					animation: 'fade',
				}}
			/>
		</Stack>
	);
}
