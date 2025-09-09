import React, { ReactNode } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

export const InputWrapper = ({
	title,
	description,
	input,
	delayAdditional = 100,
}: {
	title?: string;
	description?: string | ReactNode;
	input: ReactNode;
	delayAdditional?: number;
}) => {
	return (
		<>
			{title && (
				<Animated.Text
					className='text-2xl font-semibold'
					entering={FadeIn.duration(400).delay(100 + delayAdditional)}
				>
					{title}
				</Animated.Text>
			)}
			{description && (
				<Animated.Text
					className='text-sm text-gray-500'
					entering={FadeIn.duration(400).delay(200 + delayAdditional)}
				>
					{description}
				</Animated.Text>
			)}
			{input && (
				<Animated.View
					entering={FadeIn.duration(400).delay(300 + delayAdditional)}
				>
					{input}
				</Animated.View>
			)}
		</>
	);
};
