import classNames from 'classnames/bind';
import styles from './Button.module.scss';
// thẻ <Link> của react-router dùng để link trang nội bộ, nó sẽ nhanh chóng và nhẹ hơn là sử dụng thẻ <a>
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
// tạo ra component Button và lấy ra props của nó để dễ dàng chuyển đổi , tái sử dụng
// ...passProp ở đây là lấy hết tất cả những prop còn lại
function Button({
  to,
  href,
  className,
  leftIcon,
  rightIcon,
  disabled = false,
  text = false,
  primary = false,
  outline = false,
  small = false,
  large = false,
  rounded = false,
  children,
  onClick,
  ...passProps
}) {
  // standart nó sẽ là button
  let Comp = 'button';

  // button sẽ luôn có prop là onClick
  //...passProp là giải tất cả các prop còn lại vào đây
  const props = {
    onClick,
    ...passProps,
  };

  //nếu như button bị disable thì nó sẽ ko cho thực hiện event onClick nữa,
  // hoặc block tất cả các event listener, bởi vì tất cả các event listener đều bắt đầu bằng 'on...'
  // sử dụng vòng lặp, lắng nghe ra sự kiện bắt đầu bằng từ 'on' và có type === function
  if (disabled) {
    Object.keys(props).forEach((key) => {
      // console.log(key);
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  // nếu trong component có props là 'to' thì có sẽ biến thành component <Link> của react-route
  // còn nếu có props là 'href' thì nó sẽ là thẻ <a>
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    Comp = 'a';
    props.href = href;
  }
  // object đằng sau này đc hiểu nếu component <Button /> có prop primary thì nó sẽ thêm một class primary vào cho component
  // outline, size cũng thế nhưng đc viết theo kiểu ES6
  const classes = cx('wrapper', {
    primary: primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
