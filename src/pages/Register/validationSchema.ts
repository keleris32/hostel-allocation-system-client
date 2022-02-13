import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    // .trim()
    .matches(/^[A-Z-a-z ]*$/, 'Please enter a valid name'),

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
    ),
  password: yup
    .string()
    .trim()
    .min(8, ({ min }) => `Password must be at least ${min} characters long`),
});
