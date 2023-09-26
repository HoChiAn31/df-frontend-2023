import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from '../Modal.module.scss';
import { forwardRef } from 'react';
import Button from '../../Button/Button';

const cx = classNames.bind(styles);

const ModalDelete = forwardRef(({ onClick, onCancel, title }, ref) => {
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
ModalDelete.propTypes = {
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
};
export default ModalDelete;
