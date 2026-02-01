import { http } from '@/shared/api';

export const logout = async () => {
	await http.post('/api/auth/logout');
};
