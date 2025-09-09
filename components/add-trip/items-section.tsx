import { Item } from '@/schemas/new-trip.schema';
import { MinusIcon, PlusIcon, TrashIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Button } from '../form/Button';

export const ItemsSection = ({
	title,
	items,
	changeQuantity,
}: {
	title: 'documents' | 'electronics' | 'clothes';
	items: Item[];
	changeQuantity: (
		item: Item,
		action: 'increment' | 'decrement' | 'delete',
		category: 'documents' | 'electronics' | 'clothes'
	) => void;
}) => {
	return (
		<View className='flex-col flex-1 h-full mb-6'>
			<View className='px-4 mb-4'>
				<View className='flex-row items-center gap-2'>
					<View className='w-2 h-2 bg-blue-500 rounded-full ' />
					<Text className='text-xl font-bold text-foreground capitalize tracking-wide'>
						{title}
					</Text>
					<View className='flex-1 h-px bg-gray-200 ml-3' />
				</View>
				<Text className='text-sm text-gray-500 mt-1 ml-4'>
					{items.length} {items.length === 1 ? 'item' : 'items'}
				</Text>
			</View>

			<View className='flex-1'>
				{items &&
					items.length > 0 &&
					items.map((item, index) => {
						return (
							<Swipeable
								key={item.itemId}
								renderRightActions={() => {
									return (
										<View className=' w-20'>
											<View className='bg-red-500 w-28 h-full items-center justify-center absolute right-0 '>
												<TouchableOpacity
													className='p-4 '
													onPress={() => changeQuantity(item, 'delete', title)}
												>
													<TrashIcon size={24} color='#fff' />
												</TouchableOpacity>
											</View>
										</View>
									);
								}}
								containerStyle={{
									flex: 1,
									paddingHorizontal: 16,
									marginBottom: 12,
								}}
							>
								<View
									className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden px-4'
									key={item.itemId}
								>
									<View className='p-4'>
										<View className='flex-row items-center justify-between'>
											<View className='flex-1 mr-4'>
												<Text className='font-semibold text-foreground text-base mb-1'>
													{item.description || item.name}
												</Text>
												{item.description && (
													<Text className='text-sm text-gray-500 font-medium'>
														{item.name}
													</Text>
												)}
											</View>

											<View className='flex-row items-center space-x-4'>
												<View className='flex-row items-center bg-gray-50 rounded-full px-3 py-2 gap-3'>
													<Button
														variant='secondary'
														className='h-7 w-7 p-0 rounded-full border-gray-200 bg-white shadow-sm'
														onPress={() => {
															changeQuantity(item, 'decrement', title);
														}}
													>
														<MinusIcon size={12} color='#6B7280' />
													</Button>

													<Text className='font-bold text-foreground min-w-[24px] text-center text-base'>
														{item.quantity}
													</Text>

													<Button
														variant='secondary'
														className='h-7 w-7 p-0 rounded-full border-gray-200 bg-white shadow-sm'
														onPress={() => {
															changeQuantity(item, 'increment', title);
														}}
													>
														<PlusIcon size={12} color='#3B82F6' />
													</Button>
												</View>
											</View>
										</View>
									</View>

									<View className='h-1 bg-gradient-to-r from-blue-400 to-purple-400' />
								</View>
							</Swipeable>
						);
					})}
			</View>
		</View>
	);
};
