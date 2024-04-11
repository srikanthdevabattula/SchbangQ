import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { booksSelector, errorSelector, fetchBooks, loadingSelector } from '../../Redux/reducers/booksReducer';

import Navbar from './components/Navbar';
import Book from './components/Book';

const BookDetails = () => {
  const { id } = useParams();
  const books = useSelector(booksSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching books:', error);
    }
  }, [error]);

  // Wait for books to be populated before finding the book by ID
  if (loading || !books) {
    return <div className='loading'>Loading...</div>;
  }

  // Find the book that matches the id from params
  const book = books.find(book => book.id === parseInt(id));

  // If book is not found, you can handle it as per your app's requirement
  if (!book) {
    return <div>Book not found</div>;
  }

  // Render the details of the book
  return (
    <div className='bg-[#242121] pb-5 h-[100vh]'>
      <Navbar />
      <div>
        <Book book={book} />
      </div>
    </div>
  );
};

export default BookDetails;
