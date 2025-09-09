import { StyleSheet } from 'react-native';

import { Button } from '@/components/form/Button';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/context/auth-context';

export default function TabTwoScreen() {
	const { logout } = useAuth();
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color='#808080'
					name='chevron.left.forwardslash.chevron.right'
					style={styles.headerImage}
				/>
			}
		>
			<Button onPress={() => logout()}>Sign out</Button>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
