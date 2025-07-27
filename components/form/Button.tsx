import { useCallback, useRef } from 'react';
import {
	ActivityIndicator,
	Animated,
	Pressable,
	Text,
	View,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'black';

interface ButtonProps {
	onPress?: () => void;
	variant?: ButtonVariant;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'bg-pm-primary',
	secondary: 'bg-white border border-gray-300',
	black: 'bg-black',
	accent: 'bg-pm-accent',
};

export const Button = ({
	onPress,
	variant = 'primary',
	disabled = false,
	loading = false,
	className = '',
	children,
}: ButtonProps) => {
	const scale = useRef(new Animated.Value(1)).current;
	const baseStyles =
		'flex-row items-center justify-center rounded-lg px-3 py-[14px]';
	const textBaseStyles = 'text-center font-medium text-white';

	const isInteractive = !disabled && !loading;

	const animateIn = useCallback(() => {
		Animated.spring(scale, {
			toValue: 0.97,
			useNativeDriver: true,
		}).start();
	}, [scale]);

	const animateOut = useCallback(() => {
		Animated.spring(scale, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	}, [scale]);

	return (
		<Pressable
			onPress={isInteractive ? onPress : undefined}
			onPressIn={isInteractive ? animateIn : undefined}
			onPressOut={isInteractive ? animateOut : undefined}
			style={({ pressed }) => [{ transform: [{ scale: scale }] }]}
		>
			<Animated.View
				className={twMerge(
					baseStyles,
					variantStyles[variant],
					disabled && 'opacity-50',
					className
				)}
			>
				<View className='flex-row items-center space-x-2'>
					{loading && (
						<ActivityIndicator size='small' color='white' className='w-6 h-6' />
					)}
					{typeof children === 'string' ? (
						<Text className={textBaseStyles}>{children}</Text>
					) : (
						children
					)}
				</View>
			</Animated.View>
		</Pressable>
	);
};
