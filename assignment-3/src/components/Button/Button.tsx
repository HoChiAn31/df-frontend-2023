import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    title?: string;
    className?: string;
    onClick?: () => void;
}

function Button({ title, className, onClick }: ButtonProps): JSX.Element {
    const classes = cx('button', {
        [className!]: className,
    });
    return (
        <button className={classes} onClick={onClick}>
            {title}
        </button>
    );
}
export default Button;