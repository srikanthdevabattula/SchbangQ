import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const Book = ({ book }) => {
  // Function to generate star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to the nearest integer
    for (let i = 0; i < roundedRating; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  };

  return (
    <div className='px-[5%] bg-[#242121] py-4'>
      <div className='bookcon'>
        {/* Check if book.volumeInfo and book.volumeInfo.imageLinks exist */}
        {book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="img" className='w-[350px] lg:w-[300px] md:w-[250px] sm:w-[180px]' />
        )}
        <h1 className='singlebookTitle'>{book.volumeInfo.title}</h1>
        <p className='singlebookSubTitle'>{book.volumeInfo.subtitle}</p>
      </div>
      <div className='publisher'>
        <h3>Publisher : <span>{book.volumeInfo.publisher}</span></h3>
        <h3>Authors : {book.volumeInfo.authors.map((name, index) => (<span key={index}>{name} &nbsp; &nbsp;</span>))}</h3>
        <h3>Categories : {book.volumeInfo.categories.map((name, index) => (<span key={index}>{name} &nbsp; &nbsp;</span>))}</h3>
        <h3>Published Date : <span>{book.volumeInfo.publishedDate}</span></h3>
        <div className='flex gap-2 items-center'>Rating : <span className='flex gap-1 text-[20px] md:text-[15px] sm:text-[12px] text-[yellow]'>{renderStars(book.volumeInfo.averageRating)}</span></div>
        <h3>Description : <span>{book.volumeInfo.description}</span></h3>
      </div>
      <div className='singlebookbtns'>
        <Link target='new' to={book.accessInfo.webReaderLink}><button className='preview'>Preview</button></Link>
        <Link target='new' to={book.saleInfo.buyLink}><button className='buyNow'>Buy Now</button></Link>
      </div>
    </div>
  );
};

export default Book;
