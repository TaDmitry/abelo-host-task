'use client';

import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@ui/index';

import type { LoginFormValues } from '../model/types';
import { useLogin } from '../model/useLogin';
import { loginSchema } from '../model/validation';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
	const { loginUser, serverError, isLoading } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields, isSubmitted, isValid },
	} = useForm<LoginFormValues>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: { username: '', password: '' },
	});

	const shouldShowError = (field: keyof LoginFormValues) =>
		Boolean(errors[field]) && (Boolean(touchedFields[field]) || isSubmitted);

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(loginUser)}
			noValidate
		>
			{serverError && (
				<Text
					className={styles.serverError}
					role='alert'
				>
					{serverError}
				</Text>
			)}

			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='username'
				>
					Username
				</label>
				<input
					{...register('username')}
					id='username'
					autoComplete='username'
					placeholder='Username'
					className={clsx(styles.input, shouldShowError('username') && styles.inputError)}
					aria-invalid={Boolean(errors.username)}
				/>
				<Text className={styles.errorText}>
					{shouldShowError('username') ? String(errors.username?.message ?? '') : ''}
				</Text>
			</div>

			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='password'
				>
					Password
				</label>
				<input
					{...register('password')}
					id='password'
					type='password'
					autoComplete='current-password'
					placeholder='Password'
					className={clsx(styles.input, shouldShowError('password') && styles.inputError)}
					aria-invalid={Boolean(errors.password)}
				/>
				<Text className={styles.errorText}>
					{shouldShowError('password') ? String(errors.password?.message ?? '') : ''}
				</Text>
			</div>

			<Button
				className={styles.button}
				type='submit'
				disabled={!isValid || isLoading}
				text={isLoading ? 'Logging in…' : 'Login'}
			/>

			<Text className={styles.demoCredentials}>
				Demo credentials: <b>demo</b> / <b>demo</b>
			</Text>
		</form>
	);
};
