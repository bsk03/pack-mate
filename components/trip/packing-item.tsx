import { TripItemType } from '@/types';
import {
	BowlFoodIcon,
	Check,
	CheckIcon,
	Heart,
	IdentificationCardIcon,
	Laptop,
	Package,
	ShirtFoldedIcon,
} from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type PackingItemProps = {
	item: TripItemType;
	onToggle: (id: string) => void;
};

const categoryIcons = {
	clothing: ShirtFoldedIcon,
	electronics: Laptop,
	toiletries: Package,
	food: BowlFoodIcon,
	essentials: Heart,
	other: Package,
	documents: IdentificationCardIcon,
};

export const PackingItem = ({ item, onToggle }: PackingItemProps) => {
	const CategoryIcon =
		categoryIcons[item.item.category as keyof typeof categoryIcons] || Package;

	return (
		<TouchableOpacity
			className={twMerge(
				'p-4 bg-card border rounded-lg transition-all duration-200',
				item.isPackedForTrip
					? 'bg-lime-500/5 border-pm-success'
					: ' border-gray-300'
			)}
			onPress={() => {
				console.log('PackingItem onPress:', item.id, item.item.name);
				onToggle(item.id);
			}}
		>
			<View className='flex-row items-center gap-3'>
				<View
					className={twMerge(
						'border border-blue-500 rounded-md p-1',
						item.isPackedForTrip && 'bg-blue-500'
					)}
				>
					<CheckIcon
						size={16}
						style={{ opacity: item.isPackedForTrip ? 1 : 0 }}
						color='white'
					/>
				</View>

				<View
					className={twMerge(
						'flex-row items-center gap-3 flex-1 ',
						item.isPackedForTrip && 'opacity-70'
					)}
				>
					<View
						className={twMerge(
							'p-2 rounded-lg',
							item.isPackedForTrip ? 'bg-pm-success/20' : 'bg-blue-100'
						)}
					>
						<CategoryIcon
							size={16}
							color={item.isPackedForTrip ? '#06d6a0' : 'blue'}
						/>
					</View>

					<View
						className={twMerge('flex-1', item.isPackedForTrip && 'opacity-60')}
					>
						<Text
							className={twMerge(
								'font-medium text-base transition-all duration-200',
								item.isPackedForTrip
									? 'line-through text-muted'
									: 'text-card-foreground'
							)}
						>
							{item.item.name}
						</Text>
						<Text className='text-xs text-muted capitalize mt-1'>
							{item.item.category}
						</Text>
					</View>
				</View>

				{item.isPackedForTrip && (
					<View className='bg-lime-500 rounded-full p-1.5 ml-2'>
						<Check size={12} />
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};
