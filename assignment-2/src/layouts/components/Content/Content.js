import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { ModalAdd } from '../../../components/Modal/Modal';
import styles from './Content.module.scss';
import Search from '../Search/Search';
import Button from '../../../components/Button/Button';
import Table from '../Table/Table';
import Pagination from '../../../components/Pagination/Pagination';

const cx = classNames.bind(styles);
const Books = [
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

    // =================================================================
];
function Content() {
    const PLAYER_STORAGE_KEY = 'PLAYER_05';

    function setConfig(books) {
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(books));
    }
    function loadConfig() {
        return JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY));
    }

    const loadBooks = loadConfig();

    const [hide, setHide] = useState(false);
    const [dataBook, setDataBook] = useState(loadBooks || Books);
    const [books, setBooks] = useState(dataBook);
    const [searchValue, setSearchValue] = useState('');
    const modalRef = useRef(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const showModalAdd = () => {
        setHide(true);
    };
    const hideModalAdd = () => {
        setHide(false);
    };
    useEffect(() => {
        const handleWindowClick = (e) => {
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
    const handleCreate = (name, author, topic, action = 'Delete') => {
        const newBook = {
            name,
            author,
            topic,
            action,
        };
        const newBooks = [...dataBook, newBook];
        setDataBook(newBooks);

        const newOffset = itemOffset > 0 ? itemOffset : 0;
        setItemOffset(newOffset);
        setConfig(newBooks);
        hideModalAdd();
    };

    // Delete Book
    const handleDelete = (index) => {
        const newBooks = [...dataBook];
        newBooks.splice(index, 1);
        setBooks(newBooks);
        setCurrentPage(Math.floor(index / itemsPerPage));
        if (currentPage === itemOffset && newBooks.length === 0) {
            // Nếu không còn phần tử, giảm itemOffset để quay lại trang 2.
            setItemOffset(itemOffset - 1);
        }
        const newDataBook = [...dataBook];
        newDataBook.splice(index + itemOffset, 1);
        setDataBook(newDataBook);
        setConfig(newDataBook);
    };
    //Search Book

    const handleSearchValue = (value) => {
        setSearchValue(value);
    };
    useEffect(() => {
        let searchResult;
        if (searchValue.trim() === '') {
            searchResult = dataBook.slice(currentPage, currentPage + itemsPerPage);
        } else {
            searchResult = dataBook.filter((book) => {
                return book.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }
        setBooks(searchResult);
    }, [searchValue, dataBook, itemsPerPage, currentPage]);

    //Pagination Book

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = dataBook.slice(itemOffset, endOffset);
        setBooks(currentItems);
        setPageCount(Math.ceil(dataBook.length / itemsPerPage));
    }, [itemOffset, dataBook, itemsPerPage]);

    const handlePageClick = (select) => {
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
}

export default Content;
