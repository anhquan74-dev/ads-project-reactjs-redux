import { faArrowRightFromBracket, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authAction';
import TokenService from '../../../services/tokenService';
// import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles);

function Header({ handelToggleSidebar }) {
  const dispatch = useDispatch();

  const refreshToken = TokenService.getLocalRefreshToken();

  const handleLogout = () => {
    dispatch(logout(refreshToken));
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('toggle-sidebar')} onClick={handelToggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={cx('logo')}>Logo</div>
      <Tippy
        interactive
        delay={[0, 500]}
        placement="bottom-end"
        render={(attrs) => (
          <div className={cx('setting')} tabIndex="-1" {...attrs}>
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUser} />
              Profile
            </NavLink>
            <NavLink to="/login" onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Logout
            </NavLink>
            <NavLink to="/testapi">TestAPI</NavLink>
          </div>
        )}
      >
        <div className={cx('avatar')}>
          <img src={require('../../../assets/images/default_avatar.png')} alt="avatar" />
        </div>
      </Tippy>
    </header>
  );
}

export default Header;
