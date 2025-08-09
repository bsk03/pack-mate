import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

interface AnimatedProgressBarProps {
	progress: number; // wartość od 0 do 1
	width?: number;
	height?: number;
	backgroundColor?: string;
	fillColor?: string;
	animated?: boolean;
	duration?: number;
}

export const AnimatedProgressBar = ({
	progress,
	width = 300,
	height = 20,
	backgroundColor = '#E0E0E0',
	fillColor = '#4CAF50',
	animated = true,
	duration = 1000,
}: AnimatedProgressBarProps) => {
	// Tworzymy referencję do wartości animacji
	const animatedValue = useRef(new Animated.Value(0)).current;
	const scaleValue = useRef(new Animated.Value(1)).current;

	// Efekt uruchamiający animację przy zmianie progresu
	useEffect(() => {
		if (animated) {
			Animated.timing(animatedValue, {
				toValue: progress,
				duration: duration,
				useNativeDriver: false, // musimy użyć false dla animacji width
				easing: Easing.out(Easing.ease), // dodajemy funkcję ease-out dla płynniejszej animacji
			}).start();
		} else {
			animatedValue.setValue(progress);
		}
	}, [progress, animated, duration]);

	// Funkcja do animacji "pulsu" przy kliknięciu
	const handlePress = () => {
		Animated.sequence([
			Animated.timing(scaleValue, {
				toValue: 0.95,
				duration: 100,
				useNativeDriver: true,
				easing: Easing.ease,
			}),
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
				easing: Easing.bounce,
			}),
		]).start();
	};

	// Interpolacja wartości animacji na szerokość wypełnienia
	const widthInterpolated = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, width],
	});

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Progress: {Math.round(progress * 100)}%</Text>
			<Pressable onPress={handlePress}>
				<Animated.View
					style={[
						styles.progressBarContainer,
						{
							width,
							height,
							backgroundColor,
							transform: [{ scale: scaleValue }],
						},
					]}
				>
					<Animated.View
						style={[
							styles.progressBarFill,
							{
								width: widthInterpolated,
								height,
								backgroundColor: fillColor,
							},
						]}
					/>
				</Animated.View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	label: {
		marginBottom: 8,
		fontSize: 16,
	},
	progressBarContainer: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	progressBarFill: {
		borderRadius: 10,
	},
});
