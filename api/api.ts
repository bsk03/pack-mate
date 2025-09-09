import { TripItemType } from '@/types';
import { api } from './client';

export const getTrips = async (query: string) => {
	const trips = await api.get(`/trips${query ? `?${query}` : ''}`);
	return trips.data.result.trips;
};

export const getTrip = async (id: string) => {
	try {
		const trip = await api.get(`/trips/${id}?trip_items.isPackedForTrip=false`);
		return trip.data.trip;
	} catch (e) {
		console.log('e', e);
		return null;
	}
};

export const getTotalTrips = async () => {
	try {
		console.log('getTotalTrips');
		const res = await api.get<{ total: number }>('/trips/total');
		console.log('getTotalTrips2');
		return res.data.total;
	} catch (e) {
		console.log('e', e);
		return null;
	}
};

export const getItems = async (query: string) => {
	const items = await api.get<{
		result: { items: { id: string; name: string }[] };
	}>(`/items${query ? `?${query}` : ''}`);
	return items.data.result.items;
};

export const updateTripItem = async ({
	itemId,
	tripId,
	item,
}: {
	itemId: string;
	tripId: string;
	item: Partial<TripItemType>;
}) => {
	console.log('updateTripItem', item);
	const res = await api.patch<{ trip_item: TripItemType }>(
		`/trips/${tripId}/items/${itemId}`,
		item
	);
	return res.data;
};
