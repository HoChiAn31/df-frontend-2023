import React, { FC } from 'react';
import classNames from 'classnames/bind';

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  setOnPageChange: (offset: number) => void;
  pageCount: number;
  itemsPerPage: number;
  dataBook: any[]
}
const cx = classNames.bind(styles);

const Pagination: FC<PaginationProps> = ({
  setOnPageChange,
  pageCount,
  itemsPerPage,
  dataBook,
}) => {
  const handlePageClick = (select: { selected: number }) => {
    const newOffset = (select.selected * itemsPerPage) % dataBook.length
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
};



export default Pagination;