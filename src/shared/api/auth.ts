import { http } from '@/shared/api';

export type MeResponse =
	| { isAuth: false; role: 'guest' }
	| { isAuth: true; role: 'user'; username: string; firstName: string; lastName: string };

export const getMe = async () => {
	const res = await http.get<MeResponse>('/api/auth/me');

	return res.data;
};
