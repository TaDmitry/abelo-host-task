'use client';

import React from 'react';
import clsx from 'clsx';

import { useViewport } from '@/shared/hooks/useViewport';
import { Button, Icon } from '@shared/ui/';

import styles from './HeaderNav.module.scss';

type NavItem = { text: string; exact?: boolean };

const items: NavItem[] = [
	{ text: 'Home', exact: true },
	{ text: 'Hot Deals' },
	{ text: 'Categorise' },
	{ text: 'Laptops' },
	{ text: 'Smartphones' },
	{ text: 'Cameras' },
	{ text: 'Accessories' },
];

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-а-яё]/gi, '');

export const HeaderNav = () => {
	const { isMobile } = useViewport();
	const [isOpen, setIsOpen] = React.useState(false);

	const dropdownId = React.useId();
	const rootRef = React.useRef<HTMLElement | null>(null);

	const close = React.useCallback(() => setIsOpen(false), []);
	const toggle = React.useCallback(() => setIsOpen((v) => !v), []);

	React.useEffect(() => {
		if (!isMobile) setIsOpen(false);
	}, [isMobile]);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		const onPointerDown = (e: PointerEvent) => {
			const root = rootRef.current;
			if (!root) return;

			if (!root.contains(e.target as Node)) close();
		};

		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
			window.addEventListener('pointerdown', onPointerDown);
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('pointerdown', onPointerDown);
		};
	}, [isOpen, close]);

	const NavList = (
		<ul className={styles.navList}>
			{items.map(({ text }) => {
				const href = text === 'Home' ? '/' : '/' + slugify(text);

				return (
					<li
						key={href}
						className={styles.navItem}
					>
						<Button
							text={text}
							href={href}
							className={styles.navButton}
							onClick={isMobile ? close : undefined}
						/>
					</li>
				);
			})}
		</ul>
	);

	return (
		<nav
			ref={rootRef}
			className={styles.navbarWrapper}
		>
			<div className={styles.navbar}>
				{isMobile ? (
					<Button
						text='Меню'
						onClick={toggle}
						icon={
							<Icon
								icon='ChevronBackOutline'
								className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
							/>
						}
						aria-expanded={isOpen}
						aria-controls={dropdownId}
						className={styles.navButton}
					/>
				) : (
					NavList
				)}
			</div>

			{isMobile && isOpen && (
				<div
					id={dropdownId}
					className={styles.dropdown}
					role='dialog'
					aria-modal='true'
					aria-label='Навигация'
				>
					{NavList}
				</div>
			)}
		</nav>
	);
};
