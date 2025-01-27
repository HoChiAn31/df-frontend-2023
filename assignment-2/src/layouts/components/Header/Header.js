import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Input from '../../../components/Input/Input';
import { useTheme } from '../../../components/ThemeProvider/ThemeProvider';
const cx = classNames.bind(styles);
function Header() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1 className={cx('title-name')}>BookStore</h1>
            </div>
            <div className={cx('user')}>
                <img
                    className={cx('user-img')}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutnFzejkJRAmwqDcir1a1g2civHLjUQxi-0HbwTh_XIZY2jfuaeo73wXKRJ75_6vvXD0&usqp=CAU"
                    alt="user"
                />
                <div className={cx('user-name')}>Ann An</div>
                <label className={cx('change-theme')}>
                    <Input
                        className={cx('btn-theme')}
                        checkbox
                        type="checkbox"
                        checked={theme}
                        // onClick={onClick}
                        onChange={toggleTheme}
                    ></Input>
                </label>
            </div>
        </div>
    );
}

export default Header;
