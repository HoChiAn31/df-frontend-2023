import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Table.module.scss';
import { useState, useRef, useEffect } from 'react';

import { ModalDelete } from '../../../components/Modal/Modal';

const cx = classNames.bind(styles);

function Table({ data = [], onDelete }) {
    const [show, setShow] = useState(false);
    const [currentIndexToDelete, setCurrentIndexToDelete] = useState();
    const modalRef = useRef();
    const handleShow = () => {
        setShow(true);
    };
    const handleHide = () => {
        setShow(false);
    };
    useEffect(() => {
        const handleWindowClick = (e) => {
            if (modalRef.current && modalRef.current === e.target) {
                handleHide();
            }
        };
        if (show) {
            window.addEventListener('click', handleWindowClick);
        }
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [show]);

    const handleDelete = (index) => {
        setCurrentIndexToDelete(index);
        handleShow();
    };
    const handleConfirmDelete = () => {
        onDelete(currentIndexToDelete);
        handleHide();
    };
    const renderItem = () => {
        return data.map((item, index) => {
            return (
                <tr key={index} data-index={index}>
                    <td>{item.name}</td>
                    <td>{item.author}</td>
                    <td>{item.topic}</td>
                    <td onClick={() => handleDelete(index)} className={cx('action')}>
                        {item.action}
                    </td>
                </tr>
            );
        });
    };
    return (
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Topic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderItem()}</tbody>
            </table>
            {show && (
                <ModalDelete
                    title={data[currentIndexToDelete].name}
                    onClick={handleConfirmDelete}
                    ref={modalRef}
                    onCancel={handleHide}
                />
            )}
        </div>
    );
}
Table.propTypes = {
    data: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default Table;
