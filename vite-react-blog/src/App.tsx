import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Education from './pages/Education';
import Reports from './pages/Reports';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="page-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raporty" element={<Reports />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/edukacja" element={<Education />} />
        </Routes>
      </div>
    </>
  );
};

export default App;