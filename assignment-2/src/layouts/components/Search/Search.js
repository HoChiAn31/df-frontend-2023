import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';
import Input from '../../../components/Input/Input';

const cx = classNames.bind(styles);
function Search({ searchValue }) {
    const handleSearchValue = (e) => {
        const inputValue = e.target.value;
        searchValue(inputValue);
    };
    return (
        <div className={cx('wrapper')}>
            <Input onChange={handleSearchValue} placeholder="Search books..." />
        </div>
    );
}
Search.propTypes = {
    searchValue: PropTypes.func,
};
export default Search;
