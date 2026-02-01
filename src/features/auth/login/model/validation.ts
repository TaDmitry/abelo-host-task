import * as yup from 'yup';

const MIN_LEN = 3;

export const loginSchema = yup.object({
	username: yup
		.string()
		.trim()
		.required('Username is required')
		.min(MIN_LEN, `Minimum ${MIN_LEN} characters`),
	password: yup
		.string()
		.trim()
		.required('Password is required')
		.min(MIN_LEN, `Minimum ${MIN_LEN} characters`),
});
