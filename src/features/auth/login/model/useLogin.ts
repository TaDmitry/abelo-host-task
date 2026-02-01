'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useUserStore } from '@/entities/user';

import { login } from '../api/login';
import type { LoginFormValues } from './types';

const UNAUTHORIZED_STATUS = 401;

export const useLogin = () => {
	const router = useRouter();
	const setAuth = useUserStore((s) => s.setAuth);

	const [serverError, setServerError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const loginUser = async (data: LoginFormValues) => {
		setIsLoading(true);
		setServerError(null);

		try {
			const result = await login(data);

			setAuth({
				username: result.user.username,
				firstName: result.user.firstName,
				lastName: result.user.lastName,
			});

			router.push('/');
			router.refresh();
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				const status = e.response?.status;

				if (status === UNAUTHORIZED_STATUS) setServerError('Invalid username or password');
				else setServerError(e.response?.data?.message ?? 'Login failed');
			} else {
				setServerError('Login failed');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { loginUser, serverError, isLoading };
};
