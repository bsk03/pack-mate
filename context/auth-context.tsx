// AuthContext.tsx
import { api } from '@/api/client';
import * as SecureStore from 'expo-secure-store';
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

interface User {
	id: string;
	email: string;
	name?: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	registerUserWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	login: async () => {},
	logout: async () => {},
	registerUserWithEmailAndPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await SecureStore.getItemAsync('access_token');
				if (token) {
					const { data } = await api.get('/users/me');
					setUser(data);
				}
			} catch (e) {
				console.warn('Auth init error', e);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		initAuth();
	}, []);

	const login = async (email: string, password: string) => {
		console.log('login', email, password);
		const { data } = await api.post('/auth/login', { email, password });
		console.log({data});
		await SecureStore.setItemAsync('access_token', data.accessToken);
		await SecureStore.setItemAsync('refresh_token', data.refreshToken);

		const me = await api.get('/users/me');
		setUser(me.data);
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync('access_token');
		await SecureStore.deleteItemAsync('refresh_token');
		setUser(null);
	};

	const registerUserWithEmailAndPassword = async (
		email: string,
		password: string
	) => {
		const { data } = await api.post('/auth/register', { email, password });
		await SecureStore.setItemAsync('access_token', data.accessToken);
		await SecureStore.setItemAsync('refresh_token', data.refreshToken);
		const me = await api.get('/users/me');
		setUser(me.data);
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, registerUserWithEmailAndPassword }}
		>
			{children}
		</AuthContext.Provider>
	);
};
