import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ name, type, placeholder, value, className, onChange, onClick, checkbox = false, checked }) {
    const classes = cx('input', {
        [className]: className,
        checkbox,
    });
    return (
        <input
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
Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    checkbox: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
};
export default Input;
