import crypto from 'node:crypto';

type JwtPayload = Record<string, unknown>;

type SignOptions = {
	expiresInSeconds: number;
};

const base64Url = (input: Buffer | string) => {
	const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;

	return buf.toString('base64').replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
};

const MILLISECONDS_PER_SECOND = 1000;

export const signJwt = (payload: JwtPayload, options: SignOptions) => {
	const secret = process.env.AUTH_JWT_SECRET ?? 'dev-secret-change-me';

	const header = {
		alg: 'HS256',
		typ: 'JWT',
	};

	const now = Math.floor(Date.now() / MILLISECONDS_PER_SECOND);

	const fullPayload = {
		...payload,
		iat: now,
		exp: now + options.expiresInSeconds,
	};

	const encodedHeader = base64Url(JSON.stringify(header));
	const encodedPayload = base64Url(JSON.stringify(fullPayload));

	const data = `${encodedHeader}.${encodedPayload}`;

	const signature = crypto.createHmac('sha256', secret).update(data).digest();

	const encodedSignature = base64Url(signature);

	return `${data}.${encodedSignature}`;
};
