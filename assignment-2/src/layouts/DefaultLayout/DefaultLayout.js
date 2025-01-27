import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import { useTheme } from '../../components/ThemeProvider/ThemeProvider';

const cx = classNames.bind(styles);

function DefaultLayout() {
    const { theme } = useTheme();
    return (
        <div className={cx('wrapper', theme ? 'dark' : 'light')}>
            <Header />
            <div className={cx('container')}>
                <Content />
            </div>
        </div>
    );
}

export default DefaultLayout;
