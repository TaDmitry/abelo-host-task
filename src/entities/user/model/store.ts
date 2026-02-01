'use client';

import { create } from 'zustand';

import type { User } from './types';

type UserState = {
	user: User;
	setGuest: () => void;
	setAuth: (payload: {
		username: string;
		email: string;
		firstName: string;
		lastName: string;
	}) => void;
};

export const useUserStore = create<UserState>((set) => ({
	user: { role: 'guest', isAuth: false },

	setGuest: () => set({ user: { role: 'guest', isAuth: false } }),

	setAuth: ({ username, email, firstName, lastName }) =>
		set({
			user: {
				role: 'user',
				isAuth: true,
				username,
				email,
				firstName,
				lastName,
			},
		}),
}));
