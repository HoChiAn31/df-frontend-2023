import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);
function Pagination({ setOnPageChange, pageCount, itemsPerPage, dataBook }) {
    const handlePageClick = (select) => {
        const newOffset = (select.selected * itemsPerPage) % dataBook.length;
        setOnPageChange(newOffset);
    };
    return (
        <ReactPaginate
            className={cx('paginate')}
            pageLinkClassName={cx('name')}
            pageClassName={cx('page')}
            activeClassName={cx('active')}
            previousLinkClassName={cx('previous')}
            nextLinkClassName={cx('next')}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}
Pagination.protoTypes = {
    setOnPageChange: PropTypes.func,
    pageCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    dataBook: PropTypes.object,
};
export default Pagination;
