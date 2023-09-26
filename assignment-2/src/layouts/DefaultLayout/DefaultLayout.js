import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';

const cx = classNames.bind(styles);

function DefaultLayout() {
    const context = useContext(ThemeContext);

    return (
        <div className={cx('wrapper', context.theme)}>
            <Header onClick={context.toggleTheme} />
            <div className={cx('container')}>
                <Content />
            </div>
        </div>
    );
}

export default DefaultLayout;
