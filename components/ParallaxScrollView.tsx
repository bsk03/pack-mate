import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

const DEFAULT_HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
	headerImage: ReactElement;
	headerBackgroundColor: { dark: string; light: string };
	headerHeight?: number;
}>;

export default function ParallaxScrollView({
	children,
	headerImage,
	headerBackgroundColor,
	headerHeight = DEFAULT_HEADER_HEIGHT,
}: Props) {
	const colorScheme = useColorScheme() ?? 'light';
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-headerHeight, 0, headerHeight],
						[-headerHeight / 2, 0, headerHeight * 0.25]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-headerHeight, 0, headerHeight],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<ThemedView style={styles.container}>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
				scrollIndicatorInsets={{ bottom: 100 }}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<Animated.View
					style={[
						styles.header,
						{
							backgroundColor: headerBackgroundColor[colorScheme],
							height: headerHeight,
						},
						headerAnimatedStyle,
					]}
				>
					{headerImage}
				</Animated.View>
				<ThemedView style={styles.content}>{children}</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		overflow: 'hidden',
		zIndex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
		gap: 16,
	},
});
