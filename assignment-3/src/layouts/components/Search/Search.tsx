import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import Input from '../../../components/Input/Input';

const cx = classNames.bind(styles);

interface SearchProps {
    searchValue: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchValue }) => {
    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        searchValue(inputValue);
    };
    return (
        <div className={cx('wrapper')}>
            <Input onChange={handleSearchValue} placeholder="Search books..." />
        </div>
    );
}



export default Search;