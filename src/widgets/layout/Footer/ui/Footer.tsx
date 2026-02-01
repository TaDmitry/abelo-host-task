'use client';

import React from 'react';

import { useFooter } from '../model/useFooter';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
	const { text } = useFooter();

	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<span>{text}</span>
			</div>
		</footer>
	);
};
