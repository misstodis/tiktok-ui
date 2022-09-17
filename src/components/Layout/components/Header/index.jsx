import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSignIn, faEllipsisVertical, faEarthAsia, faCircle, faCircleQuestion, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/asset/images'; //import logo
import styles from './Header.module.scss';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
// tạo ra 1 arry menu cho dấu 3 chấm ở header khi hover vào
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: 'en',
          title: 'English'
        },
        {
          type: "language",
          code: 'vi',
          title: 'Tiếng việt',
        },
        {
          type: "language",
          code: 'nl',
          title: 'Nederlands'
        },
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback"
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Key board shortcut ",
    to: ""
  },
]
function Header() {
  const [searchResult, setSearchResult] = useState([]);

  /**
   * tạo ra function để kiểm tra khi menu có nhiều cấp 
   * thì mình phải biết mình đang ấn vào item của menu cấp nào
   * bằng việc dùng switchcase và kiểm tra type truyền trong element 
   */
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "language":
        console.log("language====>", menuItem);
        break;
      default:
        break;
    }
  }

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="logo" />
        </div>
        {/* tippy là một thư viện cài ngoài vào, tippy sử dụng để show kết quả tìm kiếm trong ô input tìm kếm */}
        <Tippy
          //interactive là 1 props của tippy và nó cho phép người dùng tương tác khi element hiện ra
          interactive={true}
          //sẽ hiện kết quả tìm kiếm nếu có kết quả trả về trong mảng
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input type="text" placeholder="Search accounts and videos" spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={cx('actions')}>
          <Button text>Upload</Button>
          <Button primary>Log in</Button>
          <Menu
            // truyền array MENU_ITEMS tự tạo bên trên vào cho component Menu thông qua props
            items={MENU_ITEMS}
            onChange={handleMenuChange}
          >
            <button className={cx('more-btn')}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
