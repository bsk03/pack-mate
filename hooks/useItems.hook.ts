import { Item } from '@/schemas/new-trip.schema';
import {
	Control,
	FieldValues,
	useFieldArray,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from 'react-hook-form';

type Props = {
	fields: Record<'itemId', string>[];
	remove: UseFieldArrayRemove;
	append: UseFieldArrayAppend<FieldValues>;
	control: Control<FieldValues>;
};

export const useItems = ({ fields, append, remove, control }: Props) => {
	const handleClick = (id: string, name: string) => {
		const exist = fields.find((field) => field.itemId === id);
		if (exist) {
			remove(fields.indexOf(exist));
		} else {
			append({ itemId: id, name, quantity: 1, description: '' });
		}
	};

	const {
		fields: documentsFields,
		remove: documentsRemove,
		update: documentsUpdate,
	} = useFieldArray({
		control,
		name: 'documents',
	});
	const {
		fields: electronicsFields,
		remove: electronicsRemove,
		update: electronicsUpdate,
	} = useFieldArray({
		control,
		name: 'electronics',
	});
	const {
		fields: clothesFields,
		remove: clothesRemove,
		update: clothesUpdate,
	} = useFieldArray({
		control,
		name: 'clothes',
	});

	const changeQuantity = (
		item: Item,
		action: 'increment' | 'decrement' | 'delete',
		category: 'documents' | 'electronics' | 'clothes'
	) => {
		console.log(category, action, item);
		const getFieldArray = () => {
			switch (category) {
				case 'documents':
					return {
						fields: documentsFields,
						update: documentsUpdate,
						remove: documentsRemove,
					};
				case 'electronics':
					return {
						fields: electronicsFields,
						update: electronicsUpdate,
						remove: electronicsRemove,
					};
				case 'clothes':
					return {
						fields: clothesFields,
						update: clothesUpdate,
						remove: clothesRemove,
					};
				default:
					return {
						fields: documentsFields,
						update: documentsUpdate,
						remove: documentsRemove,
					};
			}
		};

		const { fields, update, remove } = getFieldArray();
		const typedFields = fields as { id: string; itemId: string }[];

		const itemIndex = typedFields.findIndex(
			(field) => field.itemId === item.itemId
		);

		if (action === 'increment') {
			update(itemIndex, {
				...item,
				quantity: item.quantity + 1,
			});
		} else if (action === 'decrement') {
			if (item.quantity > 1) {
				update(itemIndex, {
					...item,
					quantity: item.quantity - 1,
				});
			} else {
				remove(itemIndex);
			}
		} else {
			remove(itemIndex);
		}
	};

	return {
		handleClick,
		changeQuantity,
	};
};
