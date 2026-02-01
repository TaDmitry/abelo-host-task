import { NextResponse } from 'next/server';

import { signJwt } from '@/shared/lib/jwt';

type LoginBody = {
	username?: string;
	password?: string;
};

const MIN_LEN = 3;
const ONE_HOUR_SECONDS = 3600; //* 1 hour

const DEMO_USER = {
	username: 'demo',
	password: 'demo',
};

export async function POST(req: Request) {
	let body: LoginBody = {};

	try {
		body = (await req.json()) as LoginBody;
	} catch {
		return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
	}

	const username = (body.username ?? '').trim();
	const password = (body.password ?? '').trim();

	if (username.length < MIN_LEN || password.length < MIN_LEN) {
		return NextResponse.json(
			{ message: `Username and password must be at least ${MIN_LEN} characters` },
			{ status: 400 }
		);
	}

	const isValid = username === DEMO_USER.username && password === DEMO_USER.password;

	if (!isValid) {
		return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
	}

	const token = signJwt(
		{
			sub: username,
			username,
			role: 'user',
		},
		{
			expiresInSeconds: ONE_HOUR_SECONDS,
		}
	);

	const res = NextResponse.json({
		ok: true,
		user: { username, firstName: 'Demo', lastName: 'User' },
	});

	res.cookies.set({
		name: 'accessToken',
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: ONE_HOUR_SECONDS,
	});

	return res;
}
