import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <HeaderContainer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      $scrolled={scrolled}
    >
      <NavContainer>
        <Logo 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/Images/logo.png" alt="Digileaf Logo" style={{ width: '35px', height: '35px' , marginRight: '7px'}} />
            Digi<LogoAccent>Leaf</LogoAccent>
          </div> 
        
        </Logo>
        
        <MenuButton onClick={() => setMenuOpen(!menuOpen)} $active={menuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>

        <NavLinks $open={menuOpen}>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#home">Home</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#about">About</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#robotics">Robotics</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#products">Products</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#research">Research</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#research">Activities</a>
          </NavItem>
          <NavItem 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05, color: '#00f0ff' }}
          >
            <a href="#contact">Contact</a>
          </NavItem>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 2rem;
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'blur(0px)'};
  background: ${props => props.$scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent'};
  transition: all 0.3s ease;
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text);
  text-transform: uppercase;
`;

const LogoAccent = styled.span`
  color: var(--primary);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }
  
  ${Logo}:hover &::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const MenuButton = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 10;
  
  span {
    width: 100%;
    height: 2px;
    background-color: var(--text);
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${props => props.$active ? 'rotate(45deg) translate(5px, 6px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$active ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$active ? 'rotate(-45deg) translate(5px, -6px)' : 'rotate(0)'};
    }
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 80%;
    max-width: 300px;
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transform: ${props => props.$open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    padding: 2rem;
    z-index: 5;
    box-shadow: ${props => props.$open ? '-5px 0 15px rgba(0, 0, 0, 0.5)' : 'none'};
  }
`;

const NavItem = styled(motion.li)`
  margin: 0 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  a {
    color: var(--text);
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }
    
    &:hover {
      color: var(--primary);
      
      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin: 0;
  }
`;

export default Header; 