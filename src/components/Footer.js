import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <LogoText>Digi<LogoAccent>Leaf</LogoAccent></LogoText>
          <LogoTagline>Pioneering Robotic Intelligence</LogoTagline>
        </FooterLogo>
        
        <FooterLinks>
          <FooterLinkColumn>
            <FooterLinkTitle>Company</FooterLinkTitle>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>News</FooterLink>
            <FooterLink>Partners</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLinkTitle>Products</FooterLinkTitle>
            <FooterLink>Delivery Robots</FooterLink>
            <FooterLink>Industrial Robots</FooterLink>
            <FooterLink>Custom Solutions</FooterLink>
            <FooterLink>Support & Maintenance</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLinkTitle>Resources</FooterLinkTitle>
            <FooterLink>Documentation</FooterLink>
            <FooterLink>API</FooterLink>
            <FooterLink>Case Studies</FooterLink>
            <FooterLink>Technical Specs</FooterLink>
          </FooterLinkColumn>
          
          <FooterLinkColumn>
            <FooterLinkTitle>Legal</FooterLinkTitle>
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms of Service</FooterLink>
            <FooterLink>Compliance</FooterLink>
            <FooterLink>Security</FooterLink>
          </FooterLinkColumn>
        </FooterLinks>
      </FooterContent>
      
      <Divider />
      
      <FooterBottom>
        <CopyrightText>
          © {new Date().getFullYear()} DigiLeaf Technologies. All rights reserved.
        </CopyrightText>
        
        <SocialIcons>
          <SocialIcon 
            as={motion.a} 
            href="https://in.linkedin.com/company/digileaftechnologies" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <i className="fab fa-linkedin-in"></i>
          </SocialIcon>
          <SocialIcon 
            as={motion.a} 
            href="https://www.instagram.com/digileaf_tech/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
          >
            <i className="fab fa-instagram"></i>
          </SocialIcon>
        </SocialIcons>
      </FooterBottom>
      
      <CircuitPattern>
        <CircuitLine style={{ top: '20%', width: '30%' }} />
        <CircuitLine style={{ top: '50%', left: '20%', width: '15%' }} />
        <CircuitLine style={{ top: '80%', width: '25%' }} />
        <CircleDot style={{ top: '20%', left: '30%' }} />
        <CircleDot style={{ top: '50%', left: '20%' }} />
        <CircleDot style={{ top: '50%', left: '35%' }} />
        <CircleDot style={{ top: '80%', left: '25%' }} />
      </CircuitPattern>
      
      <BackToTop 
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <BackToTopIcon>↑</BackToTopIcon>
      </BackToTop>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  background-color: #050505;
  padding: 5rem 0 2rem;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const FooterLogo = styled.div`
  flex: 1;
  max-width: 300px;
`;

const LogoText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: var(--text);
  text-transform: uppercase;
`;

const LogoAccent = styled.span`
  color: var(--primary);
`;

const LogoTagline = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const FooterLinkColumn = styled.div`
  min-width: 150px;
`;

const FooterLinkTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 30px;
    height: 2px;
    background: var(--primary);
  }
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: var(--primary);
    transform: translateX(5px);
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
  margin: 4rem auto 2rem;
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const CopyrightText = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
    color: var(--background);
  }
`;

const CircuitPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.1;
`;

const CircuitLine = styled.div`
  position: absolute;
  left: 0;
  height: 1px;
  background-color: var(--primary);
`;

const CircleDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary);
`;

const BackToTop = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 240, 255, 0.1);
  border: 1px solid var(--primary);
  color: var(--primary);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
  
  &:hover {
    background-color: var(--primary);
    color: var(--background);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  }
`;

const BackToTopIcon = styled.span`
  line-height: 1;
`;

export default Footer; 