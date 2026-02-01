import type { Metadata } from 'next';

import { AuthBootstrap } from './providers/AuthBootstrap';

import '@styles/globals.scss';

type Props = {
	children: React.ReactNode;
};

export const metadata: Metadata = {
	title: 'SkeletonHub',
	description: 'SkeletonHub',
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico' },
			{ url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon/favicon.svg', type: 'image/svg+xml' },
		],
		apple: '/favicon/apple-touch-icon.png',
	},
};

export default async function RootLayout({ children }: Props) {
	return (
		<html lang='ru'>
			<body>
				<main>
					<AuthBootstrap />
					{children}
				</main>
			</body>
		</html>
	);
}
