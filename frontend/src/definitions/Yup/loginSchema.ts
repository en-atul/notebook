import * as Yup from 'yup'

export const LoginSchema = Yup.object()
	.shape({
		email: Yup.string()
			.trim()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.email('Invalid email')
			.required('Required'),
		password: Yup.string().required('Required'),
	})
	.required();
