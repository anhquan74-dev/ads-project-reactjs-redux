import { NavLink, Outlet } from 'react-router-dom';
import styles from './TestAPI.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const TestAPI = () => {
  const user = useSelector((state) => state.auth.login.user);

  return (
    <div className={cx('wrapper')}>
      <h1>Test API (refreshToken)</h1>
      <div className={cx('menu')}>
        {user.roles[0] === 'ADMIN' && <NavLink to="/testapi/admin">Admin Board</NavLink>}
        {(user.roles[0] === 'ADMIN' || user.roles[0] === 'DAC') && <NavLink to="/testapi/dac">DAC Board</NavLink>}
        {(user.roles[0] === 'ADMIN' || user.roles[0] === 'DAC' || user.roles[0] === 'ADVERTISER') && (
          <NavLink to="/testapi/advertiser">Advertiser Board</NavLink>
        )}
      </div>
      <div className={cx('content')}>
        <Outlet />
      </div>
    </div>
  );
};

export default TestAPI;
