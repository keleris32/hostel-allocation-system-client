import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/accessToken';
import { Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import { GlobalContext } from '../../context/provider';
import { ErrorAlert } from '../../components';
import { registrationValidationSchema } from './validationSchema';
import { registerStudent } from '../../context/actions/registerStudent';
import DropdownOptions from '../../components/DropdownOptions';
import { COURSES, GENDERS, LEVELS } from '../../data';
import AnimatedPage from '../../components/AnimatedPage';
import salemLogo from '../../assets/salemunilogo.png';

export interface RegistrationFormTypes {
  name: string;
  level: string;
  course: string;
  matric_no: string;
  password: string;
  gender: string;
}

function Register(): JSX.Element {
  const navigate = useNavigate();
  const token = getAccessToken();

  const [isErrorAlertActive, setIsErrorAlertActive] = useState<boolean>(false);
  const [selectedLevelOption, setSelectedLevelOption] =
    useState<string>('Select your level');
  const [selectedCourseOption, setSelectedCourseOption] =
    useState<string>('Select your course');
  const [selectedGenderOption, setSelectedGenderOption] =
    useState<string>('Select your gender');
  const {
    // @ts-ignore
    authDispatch,
    // @ts-ignore
    authState: { registerLoading, registerError },
  } = useContext(GlobalContext);

  const submitForm = (formData: RegistrationFormTypes): void => {
    formData.level = selectedLevelOption;
    formData.course = selectedCourseOption;
    formData.gender = selectedGenderOption;

    if (
      selectedLevelOption !== 'Select your level' ||
      selectedCourseOption !== 'Select your course' ||
      selectedGenderOption !== 'Select your gender'
    ) {
      registerStudent(formData, setIsErrorAlertActive, navigate)(authDispatch);
    } else {
      alert('Please complete your the form before proceeding');
    }
  };

  const navigateToLoginPage = (): void => {
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div className="auth-body">
      <div style={{ position: 'absolute' }}>
        <ErrorAlert
          isErrorAlertActive={isErrorAlertActive}
          setIsErrorAlertActive={setIsErrorAlertActive}
          severity="error"
          variant="filled"
          title="Could not create account"
          message={registerError}
        />
      </div>
      <AnimatedPage>
        <div className="auth-form-con">
          <div className="auth-app-logo">
            <img src={salemLogo} alt="School logo" />
          </div>
          <Formik
            initialValues={{
              name: '',
              level: selectedLevelOption,
              course: selectedCourseOption,
              matric_no: '',
              password: '',
              gender: selectedGenderOption,
            }}
            validateOnMount={true}
            validationSchema={registrationValidationSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} autoComplete="off">
                <h2>Register</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                />
                {props.errors.name && props.touched.name && (
                  <p className="auth-errors">{props.errors.name}</p>
                )}

                <DropdownOptions
                  selectedOption={selectedLevelOption}
                  setSelectedOption={setSelectedLevelOption}
                  OPTIONS={LEVELS}
                />

                <DropdownOptions
                  selectedOption={selectedCourseOption}
                  setSelectedOption={setSelectedCourseOption}
                  OPTIONS={COURSES}
                  fixedHeight={true}
                />

                <input
                  type="text"
                  name="matric_no"
                  placeholder="Matric Number"
                  onChange={props.handleChange('matric_no')}
                  onBlur={props.handleBlur('matric_no')}
                  value={props.values.matric_no.trim()}
                />
                {props.errors.matric_no && props.touched.matric_no && (
                  <p className="auth-errors">{props.errors.matric_no}</p>
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password.trim()}
                />
                {props.errors.password && props.touched.password && (
                  <p className="auth-errors">{props.errors.password}</p>
                )}

                <DropdownOptions
                  selectedOption={selectedGenderOption}
                  setSelectedOption={setSelectedGenderOption}
                  OPTIONS={GENDERS}
                />

                <button type="submit" disabled={registerLoading}>
                  {registerLoading ? (
                    <CircularProgress style={{ color: '#fff' }} size={25} />
                  ) : (
                    'Register your account'
                  )}
                </button>
              </form>
            )}
          </Formik>
          <span className="auth-form-link">
            Already have an account?{' '}
            <span
              className="auth-form-active-link"
              onClick={navigateToLoginPage}
            >
              Login here!
            </span>
          </span>
        </div>
      </AnimatedPage>
    </div>
  );
}

export default Register;
