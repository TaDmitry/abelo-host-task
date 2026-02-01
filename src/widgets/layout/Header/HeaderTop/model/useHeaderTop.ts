'use client';

import React from 'react';

import { useViewport } from '@/shared/hooks/useViewport';

import { buildContactItems } from '../lib/buildContactItems';
import { CONTACTS } from '../lib/constants';

export const useHeaderTop = () => {
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

	const contactItems = React.useMemo(
		() => buildContactItems(handleCopyAddress),
		[handleCopyAddress]
	);

	React.useEffect(() => {
		if (!isMobile) setIsOpen(false);
	}, [isMobile]);

	React.useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		if (isOpen) window.addEventListener('keydown', onKeyDown);

		return () => window.removeEventListener('keydown', onKeyDown);
	}, [isOpen, close]);

	return {
		isMobile,
		isOpen,
		dropdownId,
		close,
		toggle,
		contactItems,
	};
};
