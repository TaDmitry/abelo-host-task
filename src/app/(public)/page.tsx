import { Header } from '@/widgets/layout/Header/index';

import styles from './HomePage.module.scss';

export default function HomePage() {
	return (
		<div className={styles.container}>
			<Header />
			<section className={styles.content}></section>
		</div>
	);
}
