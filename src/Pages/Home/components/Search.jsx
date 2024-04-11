import React, { useState } from 'react';
import book from '../../../assets/book.png'
import { Navigate } from 'react-router-dom';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
   
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

 

  return (
    <div className='navBar'>
      <div className='navTitle'>
        <img src={book} alt="" className='logo'/>
        <h1 className='logoTitle'>MBS</h1>
      </div>
     
        <form onSubmit={handleSearch} className='navSearch'>
          <input
            type="search"
            name=""
            id=""
            placeholder='Enter Book Name'
            value={searchTerm}
            onChange={handleChange}
          />
          <button type='submit'>Search</button>
      </form>
      </div>
 
  );
};

export default Search;
