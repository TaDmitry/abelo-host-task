'use client';

import React from 'react';
import clsx from 'clsx';

import { useViewport } from '@/shared/hooks/useViewport';
import { Button, Icon } from '@ui/index';

import styles from './HeaderTop.module.scss';

const CONTACTS = {
	phone: {
		label: '+7 (999) 999-99-99',
		href: 'tel:+79999999999',
	},
	email: {
		label: 'info@example.com',
		href: 'mailto:info@example.com',
	},
	address: {
		label: 'Москва, ул. Примерная, д. 1',
	},
} as const;

type ContactItem = {
	key: string;
	icon: Parameters<typeof Icon>[0]['icon'];
	text: string;
	href?: string;
	onClick?: () => void;
	title?: string;
};

export const HeaderTop: React.FC = () => {
	const { isMobile } = useViewport();
	const [isOpen, setIsOpen] = React.useState(false);

	const dropdownId = React.useId();

	const close = React.useCallback(() => setIsOpen(false), []);
	const toggle = React.useCallback(() => setIsOpen((v) => !v), []);

	const handleCopyAddress = React.useCallback(async () => {
		try {
			await navigator.clipboard.writeText(CONTACTS.address.label);
		} catch {}
	}, []);

	const contactItems: ContactItem[] = React.useMemo(
		() => [
			{
				key: 'phone',
				icon: 'Call',
				text: CONTACTS.phone.label,
				href: CONTACTS.phone.href,
			},
			{
				key: 'email',
				icon: 'Mail',
				text: CONTACTS.email.label,
				href: CONTACTS.email.href,
			},
			{
				key: 'address',
				icon: 'Location',
				text: CONTACTS.address.label,
				onClick: handleCopyAddress,
				title: 'Нажмите, чтобы скопировать адрес',
			},
		],
		[handleCopyAddress]
	);

	React.useEffect(() => {
		if (!isMobile) setIsOpen(false);
	}, [isMobile]);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, close]);

	const ContactsList = (
		<>
			{contactItems.map((item) => (
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

	return (
		<section className={styles.container}>
			<div className={styles.headerTop}>
				{isMobile ? (
					<Button
						icon={
							<Icon
								icon='ChevronBackOutline'
								className={clsx(styles.iconArrow, styles.chevron, isOpen && styles.chevronOpen)}
							/>
						}
						text='Контакты'
						onClick={toggle}
						title='Показать контакты'
						className={styles.contactBtn}
						aria-expanded={isOpen}
						aria-controls={dropdownId}
					/>
				) : (
					<div className={styles.contactList}>{ContactsList}</div>
				)}

				<div className={styles.spacer}>
					<Button
						icon={
							<Icon
								icon='User'
								className={styles.icon}
							/>
						}
						text='Логин'
						href='/login'
						className={styles.contactBtn}
					/>
				</div>
			</div>

			{isMobile && isOpen && (
				<>
					<button
						type='button'
						className={styles.overlay}
						aria-label='Закрыть контакты'
						onClick={close}
					/>

					<div
						id={dropdownId}
						className={styles.dropdown}
						role='dialog'
						aria-modal='true'
						aria-label='Контакты'
					>
						<div className={styles.contactListDropdown}>{ContactsList}</div>
					</div>
				</>
			)}
		</section>
	);
};
