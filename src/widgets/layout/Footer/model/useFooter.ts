'use client';

import { selectUser, useUserStore } from '@/entities/user';

export const useFooter = () => {
	const user = useUserStore(selectUser);
	const year = new Date().getFullYear();

	if (!user.isAuth) {
		return {
			text: `${year}g`,
		};
	}

	return {
		text: `${year}g · Logged as ${user.email}`,
	};
};
