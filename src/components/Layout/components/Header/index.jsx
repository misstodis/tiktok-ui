import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faCloudUpload, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
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

  const currentUser = true;

  // tạo ra menu cho user khi đăng nhập
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/@duc"
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coin"
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Feedback and help",
      to: "/settings"
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/settings",
      separate: true,
    },
  ]

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="logo" />
        </div>
        {/* tippy là một thư viện cài ngoài vào, tippy sử dụng để show kết quả tìm kiếm trong ô input tìm kếm */}
        <HeadlessTippy
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
        </HeadlessTippy>

        <div className={cx('actions')}>
          {/* check inlogged user */}
          {currentUser ? (
            <>
              <Tippy content="Upload video" placement='bottom' delay={[0, 200]}>
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCloudUpload} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}

          {/* truyền array MENU_ITEMS tự tạo bên trên vào cho component Menu thông qua props  */}
          {/* nếu như user đã đăng nhập sẽ hiện menu khác */}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange} >
            {currentUser ? (
              <img
                src='https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/3070cea346f0a3def6e47fd0e4e0d78f~c5_100x100.jpeg?x-expires=1663675200&x-signature=lQidvYik52aHwzDHbvDeieLzkaE%3D'
                className={cx('user-avatar')}
                alt="Nguyen Duc Khoa"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div >
    </header >
  );
}

export default Header;
