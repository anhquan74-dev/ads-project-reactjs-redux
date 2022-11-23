import { faChartSimple, faClipboardCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Sidebar = ({ isToggleSidebar }) => {
  const [selectedMenu, setSelectedMenu] = useState();

  const user = useSelector((state) => state.auth.login.user);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('user')}>
        <div
          className={cx('avatar', {
            'avatar-toggle': isToggleSidebar,
          })}
        >
          <img src={require('../../../assets/images/default_avatar.png')} alt="" />
        </div>
        {!isToggleSidebar && <div>{`${user.firstName} ${user.lastName}`}</div>}
      </div>
      <NavLink
        to="/dashboard"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
          'menu-active': selectedMenu === 'dashboard',
        })}
        title="Dashboard"
        onClick={() => setSelectedMenu('dashboard')}
      >
        <div>
          <FontAwesomeIcon icon={faChartSimple} />
        </div>
        {!isToggleSidebar && <div>Dashboard</div>}
      </NavLink>
      <NavLink
        to="/campaign"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
          'menu-active': selectedMenu === 'campaign',
        })}
        title="Campaign"
        onClick={() => setSelectedMenu('campaign')}
      >
        <div>
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
        {!isToggleSidebar && <div>Campaign</div>}
      </NavLink>
      <NavLink
        to="/account"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
          'menu-active': selectedMenu === 'account',
        })}
        title="Account"
        onClick={() => setSelectedMenu('account')}
      >
        <div>
          <FontAwesomeIcon icon={faUsers} />
        </div>
        {!isToggleSidebar && <div>Account</div>}
      </NavLink>
    </div>
  );
};

export default Sidebar;
