import type { User } from './types';

export const selectUser = (s: { user: User }) => s.user;
export const selectIsAuth = (s: { user: User }) => s.user.isAuth;
export const selectRole = (s: { user: User }) => s.user.role;
