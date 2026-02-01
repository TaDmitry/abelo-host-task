import { http } from '@/shared/api';

import type { LoginFormValues } from '../model/types';

export type LoginResponse = {
	ok: true;
	user: { username: string; firstName: string; lastName: string };
};

export const login = async (data: LoginFormValues) => {
	const res = await http.post<LoginResponse>('/api/auth/login', data);

	return res.data;
};
