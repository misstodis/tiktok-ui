import styles from './Sidebar.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function Slidebar() {
  return (
    <aside className={cx('wrapper')}>
      <h2>Slidebar</h2>
    </aside>
  );
}

export default Slidebar;
