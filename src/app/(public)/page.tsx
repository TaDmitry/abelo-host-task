'use client';

import { LatestProducts } from '@/widgets/products/LatestProducts';

import styles from './HomePage.module.scss';

export default function HomePage() {
	return (
		<section className={styles.page}>
			<LatestProducts />;
		</section>
	);
}
