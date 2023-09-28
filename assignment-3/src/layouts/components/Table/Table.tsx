import React, { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Table.module.scss';

import { ModalDelete } from '../../../components/Modal/Modal';

const cx = classNames.bind(styles);

interface TableProps {
    data: Array<{
        name: string;
        author: string;
        topic: string;
        action: string;
    }>;
    onDelete: (index: number) => void;
}

const Table: FC<TableProps> = ({ data = [], onDelete }) => {
    const [show, setShow] = useState<boolean>(false);
    const [currentIndexToDelete, setCurrentIndexToDelete] = useState<number>();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
    };

    useEffect(() => {
        const handleWindowClick = (e: MouseEvent) => {
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

    const handleDelete = (index: number) => {
        setCurrentIndexToDelete(index);
        handleShow();
    };

    const handleConfirmDelete = () => {
        if (currentIndexToDelete !== undefined) {
            onDelete(currentIndexToDelete);
            handleHide();
          }
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
            {show && currentIndexToDelete !== undefined && (
                <ModalDelete
                    title={data[currentIndexToDelete].name}
                    onClick={handleConfirmDelete}
                    ref={modalRef}
                    onCancel={handleHide}
                />
            )}
        </div>
    );
};



export default Table;