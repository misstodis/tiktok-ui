import classNames from 'classnames/bind';
import styles from "./Menu.module.scss";
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {

    //tạo ra 1 biến để lưu class sử dụng cho css
    // thêm class với logic
    const classes = cx('menu-items', {
        // nếu object data có element sperate thì nó sẽ thêm class separate vào
        separate: data.separate
    })

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
