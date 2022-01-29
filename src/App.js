import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './inc/Header';
import Footer from './inc/Footer';
import HomeTopList from './components/HomeTopList';

function App() {
  return (
    <>
      <Header />
      <Footer />
      <HomeTopList type={'topstories'} id={'8863'} />
    </>
  );
}

export default App;
