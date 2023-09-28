import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { ModalAdd } from '../../../components/Modal/Modal';
import styles from './Content.module.scss';
import Search from '../Search/Search';
import Button from '../../../components/Button/Button';
import Table from '../Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const cx = classNames.bind(styles);

interface Book {
    name: string;
    author: string;
    topic: string;
    action: string;
}

const Books: Book[] = [
    {
        name: 'Refactoring 1 ',
        author: 'Martin',
        topic: 'Programming',
        action: 'Delete',
    },
    {
        name: 'Clean Code 2',
        author: 'Robert C. Martin',
        topic: 'Programming',
        action: 'Delete',
    },
    {
        name: 'Design Patterns 3',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        topic: 'Programming',
        action: 'Delete',
    },
    {
        name: 'Database Fundamentals 4',
        author: 'Alice Smith',
        topic: 'Database',
        action: 'Delete',
    },
    {
        name: 'SQL Mastery 5 ',
        author: 'John Doe',
        topic: 'Database',
        action: 'Delete',
    },
    {
        name: 'DevOps Handbook OK 6',
        author: 'Gene Kim, Patrick Debois, John Willis, Jez Humble',
        topic: 'DevOps',
        action: 'Delete',
    },
];

const Content: FC = () => {
  
    const PLAYER_STORAGE_KEY: string = 'PLAYER_05';
   
    function setConfig(books: Book[]): void {
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(books));
    }

    function loadConfig(): Book[] {
        const storedData = localStorage.getItem(PLAYER_STORAGE_KEY);

        if (storedData === null) {
          // Trả về một mảng rỗng hoặc xử lý khác tùy thuộc vào yêu cầu của bạn
          return Books;
        }
      
        return JSON.parse(storedData);
    }

    const loadBooks: Book[] = loadConfig();

    const [hide, setHide] = useState<boolean>(false);
    const [dataBook, setDataBook] = useState<Book[]>(loadBooks || Books);
    const [books, setBooks] = useState<Book[]>(dataBook);
    const [searchValue, setSearchValue] = useState<string>('');
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage: number = 5;

    const showModalAdd = (): void => {
        setHide(true);
    };

    const hideModalAdd = (): void => {
        setHide(false);
    };

    useEffect(() => {
        const handleWindowClick = (e: MouseEvent): void => {
            if (modalRef.current && modalRef.current === e.target) {
                hideModalAdd();
            }
        };

        if (hide) {
            window.addEventListener('click', handleWindowClick);
        }

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [hide]);

    // Add Book
    const handleCreate = (name: string, author: string, topic: string, action: string = 'Delete'): void => {
        const newBook: Book = {
            name,
            author,
            topic,
            action,
        };

        const newBooks: Book[] = [...dataBook, newBook];
        setDataBook(newBooks);

        const newOffset: number = itemOffset > 0 ? itemOffset : 0;
        setItemOffset(newOffset);
        setConfig(newBooks);
        hideModalAdd();
    };

    // Delete Book
    const handleDelete = (index: number): void => {
        const newBooks: Book[] = [...dataBook];
        newBooks.splice(index, 1);
        setBooks(newBooks);
        setCurrentPage(Math.floor(index / itemsPerPage));

        if (currentPage === itemOffset && newBooks.length === 0) {
            // Nếu không còn phần tử, giảm itemOffset để quay lại trang 2.
            setItemOffset(itemOffset - 1);
        }

        const newDataBook: Book[] = [...dataBook];
        newDataBook.splice(index + itemOffset, 1);
        setDataBook(newDataBook);
        setConfig(newDataBook);
    };

    // Search Book
    const handleSearchValue = (value: string): void => {
        setSearchValue(value);
    };

    useEffect(() => {
        let searchResult: Book[];

        if (searchValue.trim() === '') {
            searchResult = dataBook.slice(currentPage, currentPage + itemsPerPage);
        } else {
            searchResult = dataBook.filter((book: Book) => {
                return book.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        setBooks(searchResult);
    }, [searchValue, dataBook, itemsPerPage, currentPage]);

    // Pagination Book
    useEffect(() => {
        const endOffset: number = itemOffset + itemsPerPage;
        const currentItems: Book[] = dataBook.slice(itemOffset, endOffset);
        setBooks(currentItems);
        setPageCount(Math.ceil(dataBook.length / itemsPerPage));
    }, [itemOffset, dataBook, itemsPerPage]);

    const handlePageClick = (select: number): void => {
        setItemOffset(select);
        setCurrentPage(select);
    };
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <Search searchValue={handleSearchValue} />
                <Button className={cx('add-book')} title="Add Book" onClick={showModalAdd} />
                <div className={cx('modal')}>
                    <div className={cx('container')}>123</div>
                </div>
            </div>
            <div className={cx('table')}>
                <Table data={books} onDelete={handleDelete} />
                <Pagination
                    setOnPageChange={handlePageClick}
                    pageCount={pageCount}
                    itemsPerPage={itemsPerPage}
                    dataBook={dataBook}
                />
            </div>
            {hide && <ModalAdd ref={modalRef} onClose={hideModalAdd} onCreate={handleCreate} />}
        </div>
    );
};

export default Content;