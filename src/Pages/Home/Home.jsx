import React, { useState } from 'react';
import Search from './components/Search';
import BooksComponent from './components/Books';
import './home.css';

const Home = () => {
  const [searchTitle, setSearchTitle] = useState('');

  const handleSearch = (title) => {
    setSearchTitle(title);
  };

  return (
    <section className='h-[100vh] bg-[#242121]'>
      <Search onSearch={handleSearch} />
      <BooksComponent searchTitle={searchTitle} />
    </section>
  );
};

export default Home;
