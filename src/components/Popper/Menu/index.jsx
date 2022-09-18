import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from "./Menu.module.scss"
import MenuItems from './menuItems';
import Header from './header';
import { useState } from 'react';

const cx = classNames.bind(styles)

// tạo 1 function rỗng trong trương hợp nếu ko có gì truyền cho onChange thì nó sẽ ko bị lỗi
const defaultFn = () => { }

function Menu({ children, items = [], onChange = defaultFn }) {
    //tạo ustate
    // nhận items ở bên index của folder components/header
    const [history, setHistory] = useState([{ data: items }]);

    // current là: lấy ra phần tử cuối của mảng
    const current = history[history.length - 1]

    // console.log(history);
    // console.log(current);

    // lặp array item khi component Menu nhận đc thông qua props
    const renderItems = () => {
        return current.data.map((items, index) => {
            //kiểm tra object items xem có element children hay ko , với kiểu ( !! nó sẽ convert sang bolean  )
            const isParent = !!items.children

            // truyền dữ liệu của arry items cho component MenuItems thông qua props
            return <MenuItems key={index} data={items} onClick={() => {
                //kiểm tra object items xem có element children hay ko
                if (isParent) {
                    // set lại cái history , giải phần tử cũ trong mảng ra và thêm phần tử mới vào array
                    // và nó sẽ là phần tử thứ 2 trong array (và là phần tử cuối) , và bởi vì mình lấy phần tử ở cuối của array để in ra
                    // nên lúc này menu sẽ hiện ra phần tử mới bởi, và nó có element giống nhau như : data, title
                    setHistory(prev => [...prev, items.children]);
                } else {
                    // làm sao để biết mình ấn vào cái nào thông qua attribute onChange 
                    // console.log(onChange);
                    onChange(items);
                }
            }} />
        })
    }

    return (
        <Tippy
            //interactive là 1 props của tippy và nó cho phép người dùng tương tác khi element hiện ra
            // visible
            offset={[12, 8]}
            interactive
            delay={[0, 800]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* header của menu */}
                        {/* operator && này sẽ trả về cái đầu tiên nếu là true  , còn không thì nó sẽ trả về false */}
                        {history.length > 1 && <Header title="Language" onBack={() => {
                            /**
                             * onBack attibute này nó sẽ truyền cho componet Header nó sẽ nhận lại ở onClick() bên file chính của component Header
                             * và nó sẽ thực hiện function 
                             * xoá đi phần tử cuối của mảng history 
                             * bằng: array.slice(start, end) , slice là cắt để lấy ra phần tử trong mảng
                             */
                            setHistory(prev => prev.slice(0, prev.length - 1));
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            /**
             * onHide là 1 props của tippy và nó sẽ hoạt động khi tippy bị tắt đi
             * ở đây mình sử dụng cho menu để khi hover ra khỏi menu thì nó sẽ quay lại cái menu đầu tiên
             */
            onHide={() => {
                setHistory(prev => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;