'use client';

import { selectUser, useUserStore } from '@/entities/user';

export default function HomePage() {
	const user = useUserStore(selectUser);

	return (
		<section>
			<div>{user.isAuth ? `User: ${user.username}` : 'Guest'}</div>
		</section>
	);
}
