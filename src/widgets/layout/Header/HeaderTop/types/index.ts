import type { Icon } from '@ui/index';

export type ContactItem = {
	key: string;
	icon: Parameters<typeof Icon>[0]['icon'];
	text: string;
	href?: string;
	onClick?: () => void;
	title?: string;
};
