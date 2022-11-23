import styles from './Banner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Banner = () => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>BANNER</h1>
    </div>
  );
};

export default Banner;
