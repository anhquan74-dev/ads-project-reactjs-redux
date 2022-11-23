import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import loginBg from '../../assets/svg/stacked-waves-haikei.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../redux/actions/authAction';
import Alert from 'react-bootstrap/Alert';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.login.status);
  const user = useSelector((state) => state.auth.login.user);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please enter your email!').email('Please enter a valid email'),
      password: Yup.string()
        .required('Please enter your password!')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          'Passwords must have at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!',
        ),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        dispatch(loginAccount(values));
      }, 500);
    },
  });

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <div
      className={cx('wrapper')}
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={cx('content')}>
        <div className={cx('login-left')}>
          <h2>Welcome to Campaign Management!</h2>
          <img src={require('../../assets/svg/login-svg.svg').default} alt="" />
        </div>

        <div className={cx('login-right')}>
          <div className={cx('logo')}>
            <div>
              <img src={require('../../assets/images/dac-logo.png')} alt="" />
            </div>
            <p>DAC Internship</p>
          </div>
          <h3>Login to your Account</h3>

          {status && status === 401 && <Alert variant="warning">The Email or Password is incorrect!</Alert>}
          <form action="" className={cx('form')} onSubmit={handleSubmit}>
            <div className={cx('form-group')}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cx({ 'error-input': errors.email && touched.email })}
              />
              {errors.email && touched.email && <p className={cx('error-message')}>{errors.email}</p>}
            </div>
            <div className={cx('form-group')}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cx({ 'error-input': errors.password && touched.password })}
              />
              {errors.password && touched.password && <p className={cx('error-message')}>{errors.password}</p>}
            </div>
            <div className={cx('remember-forgot')}>
              <span>Forgot password?</span>
            </div>
            <button type="submit" className={cx('btn-login')} disabled={isSubmitting && status !== 401}>
              {isSubmitting && status !== 401 && (
                <div className={cx('spinner')}>
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              )}
              Login
            </button>
          </form>
          <div className={cx('divide')}>
            <span></span>
            <span>Or</span>
            <span></span>
          </div>
          <div className={cx('login-with')}>
            <div>
              <img src={require('../../assets/svg/google-logo.svg').default} alt="" />
              Login with Google
            </div>
            <div>
              <img src={require('../../assets/svg/facebook-logo.svg').default} alt="" />
              Login with Facebook
            </div>
          </div>
          <p className={cx('create-account')}>
            Don't have an account? <span>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
