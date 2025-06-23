import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import RoboticsPlatform from './components/RoboticsPlatform';
import Products from './components/Products';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Karna from './components/Karna';

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/karna" element={<Karna />} />
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <About />
              <RoboticsPlatform />
              <Products />
              <Research />
              <Contact />
              <Footer />
            </>
          } />
        </Routes>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  position: relative;
  background-color: #0a0a0a;
  color: #f5f5f5;
  overflow: hidden;
`;

export default App;
