import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type Props = {
	children: React.ReactNode;
	className?: string;
};
export const Tile = ({ children, className }: Props) => {
	return (
		<View
			className={twMerge(
				'border rounded-lg p-4 border-gray-300 bg-white',
				className
			)}
		>
			{children}
		</View>
	);
};
