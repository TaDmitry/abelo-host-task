import type { ContactItem } from '../types';
import { CONTACTS } from './constants';

export const buildContactItems = (copyAddress: () => void): ContactItem[] => [
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
		onClick: copyAddress,
		title: 'Нажмите, чтобы скопировать адрес',
	},
];
