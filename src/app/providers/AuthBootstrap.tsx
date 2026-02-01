'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/entities/user';
import { getMe } from '@/shared/api/auth';

export const AuthBootstrap = () => {
	const setGuest = useUserStore((s) => s.setGuest);
	const setAuth = useUserStore((s) => s.setAuth);

	useEffect(() => {
		const run = async () => {
			try {
				const me = await getMe();

				if (!me.isAuth) {
					setGuest();

					return;
				}

				setAuth({
					username: me.username,
					email: me.email,
					firstName: me.firstName,
					lastName: me.lastName,
				});
			} catch {
				setGuest();
			}
		};

		void run();
	}, [setAuth, setGuest]);

	return null;
};
