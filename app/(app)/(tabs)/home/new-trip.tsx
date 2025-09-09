import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { api } from '@/api/client';
import { ClothesStep } from '@/components/add-trip/clothes';
import { DateStep } from '@/components/add-trip/date';
import { DocumentsStep } from '@/components/add-trip/documents';
import { ElectronicsStep } from '@/components/add-trip/electronics';
import { NewTripHeader } from '@/components/add-trip/header';
import { ItemsSheet } from '@/components/add-trip/items-sheet';
import { LocationStep } from '@/components/add-trip/location';
import { SummaryStep } from '@/components/add-trip/summary';
import { TripName } from '@/components/add-trip/trip-name';
import { usePages } from '@/hooks/usePages.hook';
import { newTripSchema } from '@/schemas/new-trip.schema';
import BottomSheet from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
	const PAGES = [
		{
			title: 'Trip name',
			description: 'Give your trip a name',
			component: TripName,
			fields: ['name'],
		},
		{
			title: 'Location',
			description: 'Where are you going?',
			component: LocationStep,
			fields: ['location'],
		},
		{
			title: 'Date',
			description: 'When are you going?',
			component: DateStep,
			fields: ['dateStart', 'dateEnd'],
		},
		{
			title: 'Documents',
			description: 'Upload your documents',
			component: DocumentsStep,
			fields: ['documents'],
		},
		{
			title: 'Electronics',
			description: 'Upload your electronics',
			component: ElectronicsStep,
			fields: ['electronics'],
		},
		{
			title: 'Clothes',
			description: 'Upload your clothes',
			component: ClothesStep,
			fields: ['clothes'],
		},
		{
			title: 'Summary',
			describe: 'Check your trip',
			component: SummaryStep,
		},
	] as const;

	const { page, nextPage, prevPage, isNextPage, isPrevPage } = usePages(
		PAGES.length
	);
	const CurrentPage = PAGES[page - 1].component;

	const form = useForm({
		mode: 'onChange',
		defaultValues: {
			name: 'Wakacje',
			location: 'Split, Croatia',
			dateStart: '2025-06-06',
			dateEnd: '2025-08-08',
			documents: [],
			electronics: [],
			clothes: [],
		},
		resolver: zodResolver(newTripSchema),
	});

	const [clothes = [], electronics = [], documents = []] = useWatch({
		control: form.control,
		name: ['clothes', 'electronics', 'documents'],
	});
	const bottomSheetRef = useRef<BottomSheet>(null);

	const showSheet =
		clothes.length + electronics.length + documents.length > 0 &&
		page > 2 &&
		page < 7;

	useEffect(() => {
		if (showSheet) {
			bottomSheetRef.current?.snapToIndex(0);
		} else {
			bottomSheetRef.current?.close();
		}
	}, [showSheet]);

	const validateCurrentStep = async () => {
		const currentFields = PAGES[page - 1].fields;
		if (!currentFields) return true;
		const currentValues: Record<string, unknown> = {};
		console.log('currentFields', currentFields);
		for (const field of currentFields) {
			currentValues[field] = form.getValues(field);
		}
		console.log('currentValues', currentValues);

		const fieldsSchema = newTripSchema.pick(
			currentFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
		);
		console.log('fieldsSchema', fieldsSchema);
		try {
			const res = await fieldsSchema.parseAsync(currentValues);
			return true;
		} catch (error) {
			const errorParsed = JSON.parse(error as string) as {
				message: string;
				inclusive: boolean;
				code: string;
				path: string[];
			}[];
			const fieldError = errorParsed[0].path[0];
			form.setError(fieldError as any, {
				type: 'manual',
				message: errorParsed[0].message,
			});

			return false;
		}
	};

	const handleCreateTrip = async () => {
		try {
			const valid = await validateCurrentStep();

			if (valid) {
				const items = [
					...form.getValues('documents'),
					...form.getValues('electronics'),
					...form.getValues('clothes'),
				];
				console.log('items', items);
				await api.post('/trips/create', {
					name: form.getValues('name'),
					destination: form.getValues('location'),
					dateStart: form.getValues('dateStart'),
					dateEnd: form.getValues('dateEnd'),
					items,
					description: '',
				});
			}
		} catch (error) {
			console.log('error', error);
		} finally {
			router.back();
		}
	};

	const handleNext = async () => {
		console.log('handleNext');
		try {
			const valid = await validateCurrentStep();
			console.log('valid', valid);
			console.log('isNextPage', isNextPage);
			if (valid) {
				form.clearErrors();
				isNextPage ? nextPage() : handleCreateTrip();
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const insets = useSafeAreaInsets();

	return (
		<View className='flex-1'>
			<FormProvider {...form}>
				<View className={`flex-1`} style={{ paddingTop: insets.top }}>
					<NewTripHeader
						title={
							form.watch('name') && page !== 1 ? form.watch('name') : 'New trip'
						}
						actualPage={page}
						totalPages={PAGES.length}
						onNext={handleNext}
						onPrevious={prevPage}
						isValid={true}
					/>
					<KeyboardAvoidingView
						behavior='padding'
						className='flex-1'
						// keyboardVerticalOffset={100}
					>
						<View
							style={{ paddingTop: 59 }}
							className={`flex-1 ${showSheet && 'pb-10'}`}
						>
							<FormProvider {...form}>
								<CurrentPage />
							</FormProvider>
						</View>
					</KeyboardAvoidingView>
				</View>

				{showSheet && (
					<ItemsSheet
						bottomSheetRef={bottomSheetRef}
						items={{
							clothes: [...clothes],
							documents: [...documents],
							electronics: [...electronics],
						}}
					/>
				)}
			</FormProvider>
		</View>
	);
}
