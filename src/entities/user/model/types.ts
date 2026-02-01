export type UserRole = 'guest' | 'user';

export type GuestUser = {
	role: 'guest';
	isAuth: false;
};

export type AuthUser = {
	role: 'user';
	isAuth: true;

	username: string;
	email: string;

	firstName: string;
	lastName: string;
};

export type User = GuestUser | AuthUser;
