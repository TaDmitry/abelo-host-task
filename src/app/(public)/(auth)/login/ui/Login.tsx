import { LoginSection } from '@/widgets/auth/LoginSection';
import { Header } from '@/widgets/layout/Header/index';

import styles from './Login.module.scss';

export default function Login() {
	return (
		<div className={styles.container}>
			<Header />
			<section className={styles.content}>
				<LoginSection />
			</section>
		</div>
	);
}
