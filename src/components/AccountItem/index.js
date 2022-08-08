import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        alt="avatar"
        src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/4d95e876302e65306f3da22b05fc7c67~c5_300x300.webp?x-expires=1660158000&x-signature=1x%2BGYUzlxhqFUQFvkYvWLZOgkv0%3D"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span>Nguyen Van A</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <span className={cx('username')}>nguyenvana</span>
      </div>
    </div>
  );
}

export default AccountItem;
