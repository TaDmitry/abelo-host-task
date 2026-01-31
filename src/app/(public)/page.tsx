import { NavBarWidget } from '@widgets/layout/NavBar';

import styles from './HomePage.module.scss';

export default function HomePage() {
	return (
		<div className={styles.container}>
			<NavBarWidget />
			<section className={styles.content}></section>
		</div>
	);
}
