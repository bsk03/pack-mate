import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen name='[id]' options={{ headerShown: false }} />
		</Stack>
	);
}
