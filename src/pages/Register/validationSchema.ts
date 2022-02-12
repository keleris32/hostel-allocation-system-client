import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    // .trim()
    .matches(/^[A-Z-a-z ]*$/, 'Please enter a valid name')
    .required('Name is required'),

  matric_no: yup
    .string()
    .trim()
    .min(
      10,
      ({ min }) => `Matric Number must be at least ${min} characters long`
    )
    .max(
      15,
      ({ max }) => `Matric Number must be at most ${max} characters long`
    )
    .required('Matric Number is required'),
  password: yup
    .string()
    .trim()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`)
    .required('Password is required'),
});
