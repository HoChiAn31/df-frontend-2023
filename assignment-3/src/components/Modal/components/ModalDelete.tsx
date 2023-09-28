import React, { ForwardedRef } from 'react';
import classNames from 'classnames/bind';

import styles from '../Modal.module.scss';
import { forwardRef } from 'react';
import Button from '../../Button/Button';

const cx = classNames.bind(styles);

interface ModalDeleteProps {
    onClick: () => void;
    onCancel: () => void;
    title?: string;
}

const ModalDelete = forwardRef<HTMLDivElement, ModalDeleteProps>(({ onClick, onCancel, title }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={cx('modal')}>
            <div className={cx('container')}>
                <div className={cx('header-delete')}>
                    <p className={cx('title-delete')}>Delete book</p>
                    <p className={cx('close-delete')} onClick={onCancel}>
                        &times;
                    </p>
                </div>
                <div className={cx('delete-content')}>
                    <p className={cx('delete-content-text')}>
                        Do you want to delete <span className={cx('delete-content-title')}>{title}</span> book?
                    </p>
                </div>
                <div className={cx('delete-button')}>
                    <Button title="Delete" className={cx('delete-button-item')} onClick={onClick} />
                    <Button title="Cancel" className={cx('delete-button-item')} onClick={onCancel} />
                </div>
            </div>
        </div>
    );
});


export default ModalDelete;