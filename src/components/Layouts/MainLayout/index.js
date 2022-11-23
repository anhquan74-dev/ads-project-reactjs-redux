import Header from '../../common/Header';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { useState } from 'react';
import Sidebar from '../../common/Sidebar';
import Banner from '../../common/Banner/Banner';

const cx = classNames.bind(styles);

function MainLayout() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  const handelToggleSidebar = () => {
    setIsToggleSidebar(!isToggleSidebar);
  };

  return (
    <>
      <div className={cx('banner')}>
        <Banner />
      </div>
      <div className={cx('header')}>
        <Header handelToggleSidebar={handelToggleSidebar} />
      </div>
      <div className={cx('container')}>
        <div
          className={cx('sidebar', {
            'sidebar-toggle': isToggleSidebar,
          })}
        >
          <Sidebar isToggleSidebar={isToggleSidebar} />
        </div>
        <div
          className={cx('content', {
            'content-toggle': isToggleSidebar,
          })}
        >
          <div className={cx('wrapper')}></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
