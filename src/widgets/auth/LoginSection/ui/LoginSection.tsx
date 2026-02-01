import { LoginForm } from '@/features/auth/login';
import { Title } from '@ui/index';

import styles from './LoginSection.module.scss';

export const LoginSection = () => {
	return (
		<section className={styles.wrapper}>
			<div className={styles.card}>
				<Title className={styles.title}>Login</Title>
				<LoginForm />
			</div>
		</section>
	);
};
