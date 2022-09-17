import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

// component wrapper nhận thêm 1 attribute className để khi sử dụng có thể custom css
function Wrapper({ children, className }) {
  return <div className={cx('wrapper', className)}>{children} </div>;
}

export default Wrapper;
