import React from 'react';
import { TouchableOpacity } from 'react-native';
import { twMerge } from 'tailwind-merge';

type Props = {
	children: React.ReactNode;
	className?: string;
	onPress?: () => void;
};
export const Tile = ({ children, className, onPress }: Props) => {
	return (
		<TouchableOpacity
			className={twMerge(
				'border rounded-lg p-4 border-gray-300 bg-white',
				className
			)}
			onPress={onPress}
			disabled={!onPress}
		>
			{children}
		</TouchableOpacity>
	);
};
