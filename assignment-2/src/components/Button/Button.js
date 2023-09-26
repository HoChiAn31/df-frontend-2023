import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ title, className, onClick }) {
    const classes = cx('button', {
        [className]: className,
    });
    return (
        <button className={classes} onClick={onClick}>
            {title}
        </button>
    );
}
Button.prototype = {
    title: PropTypes.string.isRequired,
    classNames: PropTypes.string,
    onClick: PropTypes.func,
};
export default Button;
