import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from '../Modal.module.scss';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { forwardRef, useState } from 'react';

const cx = classNames.bind(styles);

const ModalAdd = forwardRef(({ onClose, onCreate }, ref) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [topic, setTopic] = useState('Programing');
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeAuthor = (e) => {
        setAuthor(e.target.value);
    };
    const handleChangeTopic = (e) => {
        setTopic(e.target.value);
    };
    const handleCreate = () => {
        onCreate(name, author, topic);
    };
    return (
        <div ref={ref} className={cx('modal')}>
            <div className={cx('container')}>
                <div className={cx('header-add')}>
                    <p className={cx('title-name')}>Name</p>
                    <p onClick={onClose} className={cx('close-add')}>
                        &times;
                    </p>
                </div>
                <div className={cx('content-add')}>
                    <div className={cx('content-item')}>
                        <p className={cx('content-name')}>Name</p>
                        <Input onChange={handleChangeName} className={cx('content-input')} />
                    </div>
                    <div className={cx('content-item')}>
                        <p className={cx('content-name')}>Author</p>
                        <Input onChange={handleChangeAuthor} className={cx('content-input')} />
                    </div>
                    <div className={cx('content-item')}>
                        <p className={cx('content-name')}>Topic</p>
                        <select value={topic} onChange={handleChangeTopic} className={cx('content-topic')}>
                            <option value="Programing">Programing</option>
                            <option value="Database">Database</option>
                            <option value="DevOps">DevOps</option>
                        </select>
                    </div>
                </div>
                <div className={cx('add-button')}>
                    <Button onClick={handleCreate} className={cx('add-btn')} title="Create" />
                </div>
            </div>
        </div>
    );
});
ModalAdd.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};
export default ModalAdd;
