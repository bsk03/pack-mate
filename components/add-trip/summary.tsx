import { useItems } from '@/hooks/useItems.hook';
import { Item } from '@/schemas/new-trip.schema';
import { format } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FlatList, Text, View } from 'react-native';
import { InputWrapper } from './input-wrapper';
import { ItemsSection } from './items-section';

type Items = {
	clothes: Item[];
	documents: Item[];
	electronics: Item[];
};

export const SummaryStep = () => {
	const {
		control,
		formState: { errors },
		watch,
		getValues,
	} = useFormContext();

	const formValues = getValues();
	const items: Items = {
		clothes: formValues.clothes || [],
		documents: formValues.documents || [],
		electronics: formValues.electronics || [],
	};

	const totalItems = Object.values(items).reduce(
		(acc, category) => acc + category.length,
		0
	);
	const { changeQuantity } = useItems({ control });

	console.log(JSON.stringify(formValues, null, 2));

	return (
		<View className='flex-1'>
			<FlatList
				data={Object.keys(items)}
				className='flex-1 flex-grow'
				contentContainerClassName='flex-grow'
				ListHeaderComponent={() => (
					<View className='px-4 py-6'>
						<View className='mb-6'>
							<InputWrapper
								description='Trip name'
								input={
									<Text className='text-2xl font-bold'>{formValues.name}</Text>
								}
							/>
						</View>
						<View className='mb-6'>
							<InputWrapper
								description='Trip destination'
								delayAdditional={200}
								input={
									<Text className='text-2xl font-bold'>
										{formValues.location}
									</Text>
								}
							/>
						</View>
						<View className='mb-6'>
							<InputWrapper
								description='Dates'
								delayAdditional={400}
								input={
									<Text className='text-2xl font-bold'>
										{format(new Date(formValues.dateStart), 'dd MMMM yyyy')} -{' '}
										{format(new Date(formValues.dateEnd), 'dd MMMM yyyy')}
									</Text>
								}
							/>
						</View>
					</View>
				)}
				renderItem={({ item: categoryKey }) => {
					const category = categoryKey as keyof Items;
					if (!changeQuantity) return null;
					return (
						<InputWrapper
							delayAdditional={600}
							input={
								<ItemsSection
									key={categoryKey}
									items={items[category]}
									title={category}
									changeQuantity={changeQuantity}
								/>
							}
						/>
					);
				}}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};
