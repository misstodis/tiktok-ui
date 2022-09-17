import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from "./Menu.module.scss"
import MenuItems from './menuItems';
import Button from '~/components/Button';

const cx = classNames.bind(styles)

function Menu({ children, items = [] }) {

    // lặp array item khi component Menu nhận đc thông qua props
    const renderItems = () => {
        return items.map((items, index) => (
            // truyền dữ liệu của arry items cho component MenuItems thông qua props
            <MenuItems key={index} data={items} />
        ))
    }
    return (
        <Tippy
            //interactive là 1 props của tippy và nó cho phép người dùng tương tác khi element hiện ra
            interactive
            delay={[0, 800]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;