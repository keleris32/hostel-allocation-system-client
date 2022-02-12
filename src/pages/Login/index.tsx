import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/accessToken';
import { Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import { loginValidationSchema } from './validationSchema';
import { loginStudent } from '../../context/actions/loginStudent';
import { useContext } from 'react';
import { GlobalContext } from '../../context/provider';
import salemLogo from '../../assets/salemunilogo.png';
import { ErrorAlert } from '../../components';

interface FormPropTypes {
  matric_no: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const token = getAccessToken();

  if (token) {
    navigate('/');
  }

  const [isErrorAlertActive, setIsErrorAlertActive] = useState<boolean>(false);
  const {
    // @ts-ignore
    authDispatch,
    // @ts-ignore
    authState: { loginLoading, isLoggedIn, loginError },
  } = useContext(GlobalContext);

  const submitForm = (formData: FormPropTypes): void => {
    loginStudent(formData, setIsErrorAlertActive)(authDispatch);
  };

  const navigateToRegisterPage = (): void => navigate('/register');

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

  return (
    <div className="auth-body">
      <div style={{ position: 'absolute' }}>
        <ErrorAlert
          isErrorAlertActive={isErrorAlertActive}
          setIsErrorAlertActive={setIsErrorAlertActive}
          severity="error"
          variant="filled"
          duration={6000}
          title="Could not login to your account"
          message={loginError}
        />
      </div>
      <div className="auth-form-con">
        <div className="auth-app-logo">
          <img src={salemLogo} alt="School logo" />
        </div>
        <Formik
          initialValues={{ matric_no: '', password: '' }}
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            submitForm(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <h2>Login</h2>
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
              <button type="submit" disabled={loginLoading}>
                {loginLoading ? (
                  <CircularProgress style={{ color: '#fff' }} size={25} />
                ) : (
                  'Login to portal'
                )}
              </button>
            </form>
          )}
        </Formik>
        <span className="auth-form-link">
          Don't have an account?{' '}
          <span
            className="auth-form-active-link"
            onClick={navigateToRegisterPage}
          >
            Register here!
          </span>
        </span>
      </div>
    </div>
  );
}

export default Login;
