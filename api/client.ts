import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const api = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL + '/api',
	timeout: 15000,
});

api.interceptors.request.use(async (config) => {
	const token = await SecureStore.getItemAsync('access_token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

let isRefreshing = false;
let waiters: ((t: string) => void)[] = [];

api.interceptors.response.use(
	(r) => r,
	async (error) => {
		const status = error?.response?.status;
		if (status === 401) {
			if (!isRefreshing) {
				isRefreshing = true;
				try {
					const refresh = await SecureStore.getItemAsync('refresh_token');
					const { data } = await axios.post(
						`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
						{
							refresh,
						}
					);
					await SecureStore.setItemAsync('access_token', data.accessToken);
					waiters.forEach((w) => w(data.accessToken));
					waiters = [];
					return api.request(error.config);
				} finally {
					isRefreshing = false;
				}
			}

			return new Promise((resolve) => {
				waiters.push((token) => {
					error.config.headers.Authorization = `Bearer ${token}`;
					resolve(api.request(error.config));
				});
			});
		}
		return Promise.reject(error);
	}
);
