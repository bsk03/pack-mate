import { z } from 'zod';

export const itemSchema = z.object({
	itemId: z.string().min(1),
	description: z.string(),
	quantity: z.number().min(1),
});
export const newTripSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	location: z.string().min(1, { message: 'Location is required' }),
	dateStart: z.string().min(1, { message: 'Start date is required' }),
	dateEnd: z.string().min(1, { message: 'End date is required' }),
	documents: z.array(itemSchema),
	electronics: z.array(itemSchema),
	clothes: z.array(itemSchema),
});

export type Item = z.infer<typeof itemSchema>;

export type NewTripFormValues = z.infer<typeof newTripSchema>;
