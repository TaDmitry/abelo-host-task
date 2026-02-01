import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const token = (await cookies()).get('accessToken')?.value;

	if (!token) {
		return NextResponse.json({ isAuth: false, role: 'guest' as const });
	}

	return NextResponse.json({
		isAuth: true,
		role: 'user' as const,
		username: 'demo',
		email: 'demo@example.com',
		firstName: 'Demo',
		lastName: 'User',
	});
}
