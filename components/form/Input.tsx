import { Eye, EyeSlash } from 'phosphor-react-native';
import React, { forwardRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native';
import { ThemedText } from '../ThemedText';

export interface InputProps<T extends FieldValues>
	extends Omit<TextInputProps, 'value' | 'onChangeText'> {
	label?: string;
	error?: string;
	containerClassName?: string;
	control?: Control<T>;
	name?: Path<T>;
	type?: 'text' | 'password';
}

export const Input = forwardRef<TextInput, InputProps<any>>(
	(
		{
			label,
			error,
			containerClassName = '',
			className = '',
			style,
			control,
			name,
			type,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const borderColor = error ? 'border-red-500' : 'border-gray-300';

		const renderPasswordIcon = () => {
			if (type !== 'password') return null;
			return (
				<TouchableOpacity
					className='absolute right-4 top-3'
					onPress={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<Eye size={24} color='#9CA3AF' weight='regular' />
					) : (
						<EyeSlash size={24} color='#9CA3AF' weight='regular' />
					)}
				</TouchableOpacity>
			);
		};

		if (control && name) {
			return (
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, value } }) => (
						<View className={`w-full space-y-1.5 ${containerClassName}`}>
							{label && <ThemedText className='text-sm'>{label}</ThemedText>}
							<View className='relative'>
								<TextInput
									ref={ref}
									className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${borderColor} ${className}`}
									style={style}
									placeholderTextColor='#9CA3AF'
									onChangeText={onChange}
									value={value}
									secureTextEntry={type === 'password' && !showPassword}
									{...props}
								/>
								{renderPasswordIcon()}
							</View>
							<Text className='text-red-500 text-sm'>{error ? error : ''}</Text>
						</View>
					)}
				/>
			);
		}

		return (
			<View className={`w-full space-y-1.5 ${containerClassName}`}>
				{label && <ThemedText className='text-sm'>{label}</ThemedText>}
				<View className='relative'>
					<TextInput
						ref={ref}
						className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${borderColor} ${className}`}
						style={style}
						placeholderTextColor='#9CA3AF'
						secureTextEntry={type === 'password' && !showPassword}
						{...props}
					/>
					{renderPasswordIcon()}
				</View>
				<Text className='text-sm text-red-500'>{error ? error : ''}</Text>
			</View>
		);
	}
);

Input.displayName = 'Input';
