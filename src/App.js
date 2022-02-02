// import logo from './logo.svg';
// import './App.css';

import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './inc/Header';
import Footer from './inc/Footer';
import Home from './pages/Home';
import Top from './pages/Top';

import './scss/style.scss';

function App() {
  const [theme, setTheme] = useState('light');
  const onChangeTheme = useCallback(() => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <BrowserRouter>
      <div className={`wrap ${theme}`}>
        <Header onChangeTheme={onChangeTheme} />
        <Routes>
          <Route path="/top" element={<Top />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
