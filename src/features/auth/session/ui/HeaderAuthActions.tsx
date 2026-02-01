'use client';

import React from 'react';
import clsx from 'clsx';

import { selectUser, useUserStore } from '@/entities/user';
import { useLogout } from '@/features/auth/logout';
import { Button, Icon } from '@ui/index';

import styles from './HeaderAuthActions.module.scss';

type Props = {
	className?: string;
};

export const HeaderAuthActions: React.FC<Props> = ({ className }) => {
	const user = useUserStore(selectUser);
	const { logoutUser } = useLogout();

	if (!user.isAuth) {
		return (
			<Button
				icon={
					<Icon
						icon='ChevronBackOutline'
						className={clsx(styles.iconArrow, styles.chevron && styles.chevronOpen)}
					/>
				}
				text='Login'
				href='/login'
				className={className}
			/>
		);
	}

	return (
		<Button
			icon={
				<Icon
					icon='LogOutOutline'
					className={styles.iconArrow}
				/>
			}
			text={`${user.firstName} ${user.lastName}`}
			onClick={logoutUser}
			className={className}
		/>
	);
};
