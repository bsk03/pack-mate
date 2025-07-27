import { Google } from '@/assets/svg/google';
import { Button } from '@/components/form/Button';
import { Input } from '@/components/form/Input';
import { auth } from '@/firebase/firebase-config';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AppleLogoIcon, ArrowLeftIcon } from 'phosphor-react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

type Inputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

export const SignUpSchema = z
	.object({
		email: z.string().email('Nieprawidłowy adres email'),
		password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Hasła muszą być takie same',
		path: ['confirmPassword'],
	});

export default function SignUpScreen() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(SignUpSchema),
	});

	const onSubmit = async (data: Inputs) => {
		try {
			await createUserWithEmailAndPassword(auth, data.email, data.password);
			Toast.show({
				type: 'success',
				text1: 'Rejestracja zakończona pomyślnie',
				text2: 'Sprawdź swoją pocztę, aby potwierdzić rejestrację',
			});
			router.replace('/(app)/(tabs)');
		} catch (err) {
			Toast.show({
				type: 'error',
				text1: 'Błąd podczas rejestracji',
				text2: 'Sprawdź swoją pocztę, aby potwierdzić rejestrację',
			});
			console.error('Registration error:', err);
		}
	};

	console.log(errors);

	return (
		<KeyboardAvoidingView behavior='padding' className='flex-1'>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView className='flex-1  mx-4  justify-around gap-8 mb-10'>
					<View className='my-6'>
						<Button
							variant='black'
							className='w-10 h-10'
							onPress={() => router.back()}
						>
							<ArrowLeftIcon size={16} color='white' />
						</Button>
						<View className='gap-2 mt-8'>
							<Text className='text-3xl   font-bold'>Zarejestruj się</Text>
							<TouchableOpacity onPress={() => router.replace('/sign-in')}>
								<Text className='text-pm-primary '>
									Masz już konto? Zaloguj się
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View className='flex-1 w-full gap-4 justify-between'>
						<View className=''>
							<Input
								label='Email'
								control={control}
								name='email'
								placeholder='john.doe@example.com'
								error={errors.email?.message}
							/>
							<Input
								label='Hasło'
								control={control}
								name='password'
								placeholder='************'
								textContentType='password'
								type='password'
								error={errors.password?.message}
							/>
							<Input
								label='Powtórz hasło'
								control={control}
								name='confirmPassword'
								placeholder='************'
								textContentType='password'
								type='password'
								error={errors.confirmPassword?.message}
							/>
						</View>
						<View className='gap-4'>
							<Button onPress={handleSubmit(onSubmit)}>Zarejestruj się</Button>

							<View className='flex-row items-center justify-center gap-3'>
								<View className='flex-1 w-full h-px bg-gray-300' />
								<Text>lub zaloguj się przez</Text>
								<View className='flex-1 w-full h-px bg-gray-300' />
							</View>
							<View className='flex-row gap-4'>
								<View className='flex-1'>
									<Button variant='secondary' className='w-full'>
										<Google />
									</Button>
								</View>
								<View className='flex-1'>
									<Button variant='black' className='w-full'>
										<AppleLogoIcon size={24} color='white' weight='fill' />
									</Button>
								</View>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
