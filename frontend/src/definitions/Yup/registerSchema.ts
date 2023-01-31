import * as Yup from 'yup'

export const RegisterSchema = Yup.object()
  .shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .test('invalid', 'Must include first and last name', name =>
        /^[a-zA-Z]+ [a-zA-Z]+/.test(name || ''),
      ),
    stateOfResidence: Yup.string().required('Required'),
    email: Yup.string()
      .trim()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .required('Required')
      .test('invalid', 'Phone number must be valid.', phone =>
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(
          phone || '',
        ),
      ),
    termsOfService: Yup.boolean()
      .required('The terms and conditions must be accepted.')
      .test(
        'accepted',
        'The terms and conditions must be accepted.',
        tos => !!tos,
      ),
  })
  .required()
