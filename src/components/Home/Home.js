import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import AddTasks from './AddTasks';
import AllTasks from './AllTasks';

const Home = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Search placeholder="Search your Memos..." onChange={handleSearch} />
      <AddTasks/>
      <AllTasks search={searchTerm}/>
    </>
  )
};

export default Home;
