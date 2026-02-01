import { Text, Title } from '@ui/index';

import styles from './HeaderMain.module.scss';

export const HeaderMain: React.FC = () => {
	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<div className={styles.titleBlock}>
					<Title
						align='Left'
						className={styles.title}
					>
						Abelohost Shop<span>.</span>
					</Title>
				</div>

				<div className={styles.imageBlock}>
					<Text>600 x 70</Text>
				</div>
			</div>
		</section>
	);
};
