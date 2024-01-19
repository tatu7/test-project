import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookList from './pages/BookList';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
function App() {
  return (
    <Layout>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
