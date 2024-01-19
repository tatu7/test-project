import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookList from './BookList';

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);
  return <BookList />;
};

export default MainPage;
