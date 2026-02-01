// ...existing code...
'use client';

import { selectUser, useUserStore } from '@/entities/user';

export const useFooter = () => {
	const user = useUserStore(selectUser);
	const year = new Date().getFullYear();

	if (!user.isAuth) {
		return {
			text: `${year} г`,
		};
	}

	return {
		text: `${year}г · Logged as ${user.email}`,
	};
};
