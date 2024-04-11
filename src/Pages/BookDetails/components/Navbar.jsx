import React from 'react'
import book from '../../../assets/book.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex items-center gap-[50px] h-[60px] bg-[#292828]'>
      <div className='flex items-center justify-center w-[50%]'>
        <img src={book} alt="" className='logo'/>
        <h1 className='logoTitle mb-2'>My Books Store</h1>
      </div>
      <div className='flex flex-1 items-center text-[white] text-[20px] sm:text-[13px] font-bold font-poppins'>
        <Link to='/'>Home</Link>
      </div>
     
       
      </div>
  )
}

export default Navbar