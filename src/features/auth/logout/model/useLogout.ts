'use client';

import { useRouter } from 'next/navigation';

import { useUserStore } from '@/entities/user';

import { logout } from '../api/logout';

export const useLogout = () => {
	const router = useRouter();
	const setGuest = useUserStore((s) => s.setGuest);

	const logoutUser = async () => {
		try {
			await logout();
		} finally {
			setGuest();
			router.refresh();
		}
	};

	return { logoutUser };
};
