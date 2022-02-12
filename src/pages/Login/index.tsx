import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/accessToken';
import { Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import { loginValidationSchema } from './validationSchema';
import { loginStudent } from '../../context/actions/loginStudent';
import { useContext } from 'react';
import { GlobalContext } from '../../context/provider';
import salemLogo from '../../assets/salemunilogo.png';

interface FormPropTypes {
  matricNumber: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const token = getAccessToken();

  if (token) {
    navigate('/');
  }

  const {
    // @ts-ignore
    authDispatch,
    // @ts-ignore
    authState: { loginLoading },
  } = useContext(GlobalContext);

  const submitForm = (formData: FormPropTypes) => {
    loginStudent(formData)(authDispatch);
  };

  return (
    <div className="auth-body">
      <div className="auth-form-con">
        <div className="auth-app-logo">
          <img src={salemLogo} alt="School logo" />
        </div>
        <Formik
          initialValues={{ matricNumber: '', password: '' }}
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => submitForm(values)}
        >
          {(props) => (
            <form action="">
              <h2>Login</h2>
              <input
                type="text"
                name="matricNumber"
                placeholder="Matric Number"
                onChange={props.handleChange('matricNumber')}
                onBlur={props.handleBlur('matricNumber')}
                value={props.values.matricNumber.trim()}
              />
              {props.errors.matricNumber && props.touched.matricNumber && (
                <p className="auth-errors">{props.errors.matricNumber}</p>
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
          <span className="auth-form-active-link">Register here!</span>
        </span>
      </div>
    </div>
  );
}

export default Login;
