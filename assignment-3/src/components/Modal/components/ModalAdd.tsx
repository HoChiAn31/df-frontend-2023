import classNames from 'classnames/bind';
import React, {  forwardRef, useState, ChangeEvent, ForwardedRef } from 'react';
import styles from '../Modal.module.scss';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

const cx = classNames.bind(styles);

interface ModalAddProps {
  onClose: () => void;
  onCreate: (name: string, author: string, topic: string) => void;

}

const ModalAdd = forwardRef<HTMLDivElement, ModalAddProps>(
  ({onClose, onCreate,},ref: ForwardedRef<HTMLDivElement>) => {
    const [name, setName] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [topic, setTopic] = useState<string>('Programing');

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
      setAuthor(e.target.value);
    };

    const handleChangeTopic = (e: ChangeEvent<HTMLSelectElement>) => {
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
              <Input name='name' onChange={handleChangeName}  className={cx('content-input')} />
            </div>
            <div className={cx('content-item')}>
              <p className={cx('content-name')}>Author</p>
              <Input
                onChange={handleChangeAuthor}
                className={cx('content-input')}
              />
            </div>
            <div className={cx('content-item')}>
              <p className={cx('content-name')}>Topic</p>
              <select
                value={topic}
                onChange={handleChangeTopic}
                className={cx('content-topic')}
              >
                <option value="Programing">Programing</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          </div>
          <div className={cx('add-button')}>
            <Button
              onClick={handleCreate}
              className={cx('add-btn')}
              title="Create"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ModalAdd;