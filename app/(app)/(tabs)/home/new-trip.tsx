import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';

import { DateStep } from '@/components/add-trip/date';
import { NewTripHeader } from '@/components/add-trip/header';
import { LocationStep } from '@/components/add-trip/location';
import { TripName } from '@/components/add-trip/trip-name';
import { usePages } from '@/hooks/usePages.hook';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
	const PAGES = [
		{
			title: 'Trip name',
			description: 'Give your trip a name',
			component: TripName,
		},
		{
			title: 'Location',
			description: 'Where are you going?',
			component: LocationStep,
		},
		{
			title: 'Date',
			description: 'When are you going?',
			component: DateStep,
		},
	] as const;
	const insets = useSafeAreaInsets();
	console.log(insets.top);
	const { page, nextPage, prevPage } = usePages(PAGES.length);

	const form = useForm({
		defaultValues: {
			name: '',
			location: '',
			startDate: '',
			endDate: '',
		},
	});

	return (
		<SafeAreaView className='flex-1'>
			<NewTripHeader
				title='New trip'
				actualPage={page - 1}
				totalPages={PAGES.length}
				onNext={nextPage}
				onPrevious={prevPage}
			/>
			<KeyboardAvoidingView
				behavior='padding'
				className='flex-1'
				keyboardVerticalOffset={100}
			>
				<ScrollView
					style={{ paddingTop: 59 }}
					keyboardShouldPersistTaps='handled'
				>
					{React.createElement(PAGES[page - 1].component)}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
