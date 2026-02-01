'use client';

import React from 'react';

import { Button, Icon } from '@ui/index';

import type { ContactItem } from '../types';

import styles from './HeaderTop.module.scss';

type Props = {
	items: ContactItem[];
};

export const ContactsList: React.FC<Props> = ({ items }) => {
	return (
		<>
			{items.map((item) => (
				<Button
					key={item.key}
					icon={
						<Icon
							icon={item.icon}
							className={styles.icon}
						/>
					}
					text={item.text}
					href={item.href}
					onClick={item.onClick}
					title={item.title}
					className={styles.contactBtn}
				/>
			))}
		</>
	);
};
