import * as Yup from 'yup'

export const ChangePasswordSchema = Yup.object()
  .shape({
    password: Yup.string().min(8, 'Too Short!').required('Required!'),
    confirmPassword: Yup.string()
      .required('Required!')
      .test(
        'passwords-match',
        'Passwords must match',
        function validatePassword(value) {
          return this.parent.password === value
        },
      ),
  })
  .required()
