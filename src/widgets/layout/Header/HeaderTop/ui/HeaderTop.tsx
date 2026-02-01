'use client';

import React from 'react';
import clsx from 'clsx';

import { HeaderAuthActions } from '@/features/auth/session';
import { Button, Icon } from '@ui/index';

import { useHeaderTop } from '../model/useHeaderTop';
import { ContactsList } from './ContactsList';

import styles from './HeaderTop.module.scss';

export const HeaderTop: React.FC = () => {
	const { isMobile, isOpen, dropdownId, close, toggle, contactItems } = useHeaderTop();

	const Contacts = <ContactsList items={contactItems} />;

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
					<div className={styles.contactList}>{Contacts}</div>
				)}

				<div className={styles.spacer}>
					<HeaderAuthActions className={styles.contactBtn} />
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
						<div className={styles.contactListDropdown}>{Contacts}</div>
					</div>
				</>
			)}
		</section>
	);
};
