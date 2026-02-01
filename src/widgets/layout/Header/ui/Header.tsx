import { HeaderMain } from '../HeaderMain/index';
import { HeaderNav } from '../HeaderNav/index';
import { HeaderTop } from '../HeaderTop/index';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<HeaderTop />
			<HeaderMain />
			<HeaderNav />
		</header>
	);
};
