import React, { FC, ChangeEvent, MouseEvent } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputProps {
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    id?: string;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<HTMLInputElement>) => void;
    checkbox?: boolean;
    checked?: boolean;
}

const Input: FC<InputProps> = ({ name, type, placeholder, value,id, className, onChange, onClick, checkbox = false, checked }) => {
    const classes = cx('input', {
        [className!]: className,
        checkbox,
    });
    return (
        <input
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            onClick={onClick}
            className={classes}
            placeholder={placeholder}
            value={value}
            checked={checked}
        />
    );
}

export default Input;