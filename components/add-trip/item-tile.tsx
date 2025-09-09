import React from 'react';
import { Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { FadeIn } from 'react-native-reanimated';
export const ItemTile = ({
	label,
	onPress,
	checked,
}: {
	label: string;
	onPress: () => void;
	checked: boolean;
}) => {
	return (
		<Animated.View
			className='flex-row items-center gap-2 py-2 '
			entering={FadeIn.duration(400).delay(300)}
		>
			<BouncyCheckbox
				onPress={onPress}
				isChecked={checked}
				className='w-10'
				fillColor='#3d7eff'
			/>
			<Text>{label}</Text>
		</Animated.View>
	);
};
