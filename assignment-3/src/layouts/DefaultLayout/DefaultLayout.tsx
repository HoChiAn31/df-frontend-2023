import classNames from 'classnames/bind';
import React, { FC } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import { useTheme } from '../../components/ThemeProvider/ThemeProvider';

const cx = classNames.bind(styles);

const DefaultLayout: FC = () => {
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