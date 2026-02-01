'use client';

import { selectUser, useUserStore } from '@/entities/user';
import { Header } from '@/widgets/layout/Header/index';

import styles from './HomePage.module.scss';

export default function HomePage() {
	const user = useUserStore(selectUser);

	return (
		<div className={styles.container}>
			<Header />
			<section className={styles.content}>
				<div>{user.isAuth ? `User: ${user.username}` : 'Guest'}</div>
			</section>
		</div>
	);
}
