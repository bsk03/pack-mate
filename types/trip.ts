export type TripType = {
	id: string;
	userId: string;
	name: string;
	destination: string;
	dateStart: string;
	dateEnd: string;
	description: string;
	createdAt: string;
	trip_items: TripItemType[];
};

export type TripItemType = {
	id: string;
	itemId: string;
	tripId: string;
	quantity: number;
	isPackedForTrip: boolean;
	isPackedBack: boolean;
	packedForTripAt: string | null;
	packedBackAt: string | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	item: ItemType;
};

export type ItemType = {
	id: string;
	key: string;
	name: string;
	category: string;
	createdAt: string;
};
