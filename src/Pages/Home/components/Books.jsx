import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  booksSelector,
  errorSelector,
  fetchBooks,
  loadingSelector,
} from '../../../Redux/reducers/booksReducer';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BooksComponent = ({ searchTitle }) => {
  const dispatch = useDispatch();
  const books = useSelector(booksSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching books:', error);
    }
  }, [error]);

  // Log the books data to the console
  useEffect(() => {
    console.log('Books:', books);
    // Set initial filtered books to all books
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    let filtered = books;

    if (searchTitle.trim() !== '') {
      filtered = filtered.filter(book =>
        book.volumeInfo.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTitle]);

  const handleFilter = (filters) => {
    let filtered = books;

    if (filters.category) {
      filtered = filtered.filter(book =>
        book.volumeInfo.categories && book.volumeInfo.categories.some(category =>
          category.toLowerCase().includes(filters.category.toLowerCase())
        )
      );
    }

    if (filters.author) {
      filtered = filtered.filter(book =>
        book.volumeInfo.authors && book.volumeInfo.authors.some(author =>
          author.toLowerCase().includes(filters.author.toLowerCase())
        )
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <div className='bg-[#242121]'>
      {loading ? (
        <p className='loading'>My Books Store...</p>
      ) : (
        <div>
          <div>
            <div className='flex items-center justify-center py-4'>
              <FilterForm onFilter={handleFilter} />
            </div>
            <div className='books'>
              <AnimatePresence>
                {filteredBooks && filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <motion.div
                      key={index}
                      className='book'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                      ) : (
                        <img src='' alt='No thumbnail available' />
                      )}
                      <p className='bookTitle'>{book.volumeInfo.title}</p>
                      <Link to={`/bookDetails/${book.id}`}>
                        <button>View Details</button>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <p>No books available</p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterForm = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ category, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Category'
        value={category}
        className='filter'
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type='text'
        placeholder='Author'
        value={author}
        className='filter'
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type='submit' className='filterBtn'>Filter</button>
    </form>
  );
};

export default BooksComponent;
