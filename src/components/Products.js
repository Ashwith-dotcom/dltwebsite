import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  // Add state and refs for horizontal scrolling
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Touch handling for swipe gestures
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 80;
  
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && showRightArrow) {
      scrollRight();
    } else if (isRightSwipe && showLeftArrow) {
      scrollLeft();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, showLeftArrow, showRightArrow]);
  
  // Check if scroll navigation arrows should be shown
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setScrollPosition(scrollLeft);
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };
  
  // Scroll functions
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -380,
      behavior: 'smooth'
    });
  };
  
  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 380,
      behavior: 'smooth'
    });
  };

  // Navigation handlers
  const handleSpecificationsClick = () => {
    navigate('/karna');
  };

  const handleInquireClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);
  
  // Add effect to check scroll position when container is mounted
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      
      // Check on window resize as well
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const products = [
    {
      id: 1,
      name: 'Karna',
      description: 'Our flagship autonomous delivery robot, designed for urban environments with advanced obstacle avoidance and dynamic route planning.',
      features: ['Payload capacity: 40kg', '8-hour battery life', 'All-terrain navigation', 'Full control with Mobile App'],
      image: '/Images/1.png'
    },
    {
      id: 2,
      name: 'Grok',
      description: 'An autonomous route-guiding and interactive robot designed specifically for real estate ventures, capable of displaying venture layouts and real-time plot details, guiding customers to specific plots.',
      features: ['Interactive Plot Display', 'Autonomous Navigation', 'Voice & Visual Interaction', 'All-Terrain Mobility'],
      image: '/Images/2.png'
    },
    {
      id: 3,
      name: 'IndustryBot',
      description: 'A heavy-duty industrial robot designed for warehouse operations, manufacturing floors, and logistics centers requiring precise movements.',
      features: ['Lifting capacity: 100kg', 'Precision control (±0.5mm)', '10-hour operation time', 'Modular attachment system'],
      image: '/Images/3.png'
    },
    {
      id: 4,
      name: 'SecurityGuard',
      description: 'An autonomous security robot with 360° surveillance capabilities, thermal imaging, and real-time threat detection algorithms.',
      features: ['24/7 patrol capability', 'AI threat detection', 'Remote monitoring interface', 'Integrated alarm system'],
      image: '/Images/3.jfif'
    },
    
    {
      id: 5,
      name: 'EducationBot',
      description: 'An autonomous route-guiding and interactive robot designed specifically for real estate ventures, capable of displaying venture layouts and real-time plot details, guiding customers to specific plots.',
      features: ['Interactive Plot Display', 'Autonomous Navigation', 'Voice & Visual Interaction', 'All-Terrain Mobility'],
      image: '/Images/4.png'
    },
    {
      id: 6,
      name: 'Dog',
      description: 'An autonomous route-guiding and interactive robot designed specifically for real estate ventures, capable of displaying venture layouts and real-time plot details, guiding customers to specific plots.',
      features: ['Interactive Plot Display', 'Autonomous Navigation', 'Voice & Visual Interaction', 'All-Terrain Mobility'],
      image: '/Images/5.png'
    }
  ];

  // Add card animation variants
  const cardVariants = {
    initial: {
      y: 0,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      y: -15,
      boxShadow: '0 20px 40px rgba(0, 240, 255, 0.25)'
    },
    tap: {
      y: -5,
      boxShadow: '0 10px 30px rgba(0, 240, 255, 0.2)'
    }
  };

  return (
    <ProductsSection id="products" className="section">
      <Container 
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants}>
          <SectionLabel>Our Innovations</SectionLabel>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Heading>Cutting-Edge <AccentText>Robot</AccentText> Solutions</Heading>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Description>
            At DigiLeaf Technologies, we develop a range of specialized robotic solutions tailored to 
            specific industry needs. Each product is built with our core technology platform and enhanced 
            with purpose-specific features to maximize performance and reliability.
          </Description>
        </motion.div>
        
        <ProductsContainer variants={itemVariants}>
          <NavArrow 
            direction="left" 
            onClick={scrollLeft}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showLeftArrow ? 1 : 0, x: showLeftArrow ? 0 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowIcon className="fas fa-chevron-left" />
          </NavArrow>
          
          <ProductsScroll 
            ref={scrollContainerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                as={motion.div}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ 
                  y: { type: "spring", stiffness: 300, damping: 15 },
                  boxShadow: { duration: 0.1 }
                }}
              >
                <CardGlow />
                <ProductImage>
                  <img src={product.image} alt={product.name} />
                  <ProductOverlay />
                  <StatusIndicator>
                    <StatusDot />
                    OPERATIONAL
                  </StatusIndicator>
                </ProductImage>
                
                <ProductContent>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  
                  <ProductFeatures>
                    {product.features.map((feature, i) => (
                      <FeatureItem key={i}>
                        <FeatureDot />
                        {feature}
                      </FeatureItem>
                    ))}
                  </ProductFeatures>
                  
                  <ProductActions>
                    <ActionButton onClick={handleSpecificationsClick}>Specifications</ActionButton>
                    <ActionButton primary onClick={handleInquireClick}>Inquire</ActionButton>
                  </ProductActions>
                </ProductContent>
                
                <CardDecoration />
              </ProductCard>
            ))}
          </ProductsScroll>
          
          <NavArrow 
            direction="right" 
            onClick={scrollRight}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showRightArrow ? 1 : 0, x: showRightArrow ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowIcon className="fas fa-chevron-right" />
          </NavArrow>
          
          <ScrollIndicator>
            <ScrollTrack>
              <ScrollThumb 
                style={{ 
                  width: `${scrollContainerRef.current ? (scrollContainerRef.current.clientWidth / scrollContainerRef.current.scrollWidth) * 100 : 20}%`,
                  left: `${scrollContainerRef.current ? (scrollPosition / scrollContainerRef.current.scrollWidth) * 100 : 0}%` 
                }}
              />
            </ScrollTrack>
          </ScrollIndicator>
        </ProductsContainer>
        
        <motion.div variants={itemVariants}>
          <CTAContainer>
            <CTAText>Looking for a custom robotic solution for your specific needs?</CTAText>
            <CTAButton>Contact Our Engineers</CTAButton>
          </CTAContainer>
        </motion.div>
      </Container>
    </ProductsSection>
  );
};

const ProductsSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 70% 30%, rgba(255, 42, 109, 0.1), transparent 50%);
    z-index: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionLabel = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: rgba(0, 240, 255, 0.1);
  border-left: 3px solid var(--primary);
  border-radius: 0 4px 4px 0;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--primary);
  margin-bottom: 1.5rem;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const AccentText = styled.span`
  background: linear-gradient(to right, var(--primary), var(--tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 4rem;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

// Replace ProductsGrid with new components for horizontal scrolling
const ProductsContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 5rem;
  padding: 0.5rem 0;
`;

const ProductsScroll = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
  scrollbar-width: none;     /* Hide scrollbar for Firefox */
  padding: 1rem 0.5rem;
  gap: 2rem;
  margin: 0 1.5rem;
  
  &::-webkit-scrollbar {
    display: none;  /* Hide scrollbar for Chrome, Safari and Opera */
  }
`;

const NavArrow = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -35px;' : 'right: -35px;'}
  width: 50px;
  height: 50px;
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: rgba(0, 240, 255, 0.2);
    border-color: var(--primary);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
    transform: translateY(-50%) scale(1.05);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${props => props.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}
  }
`;

const ArrowIcon = styled.i`
  color: var(--primary);
  font-size: 1rem;
  filter: drop-shadow(0 0 2px rgba(0, 240, 255, 0.5));
`;

const ScrollIndicator = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ScrollTrack = styled.div`
  width: 40%;
  height: 3px;
  background-color: rgba(26, 26, 26, 0.7);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 240, 255, 0.05) 50%, 
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ScrollThumb = styled.div`
  position: absolute;
  height: 100%;
  background: linear-gradient(to right, var(--primary), var(--tertiary));
  border-radius: 2px;
  transition: all 0.2s ease;
  box-shadow: 0 0 8px var(--primary);
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

const ProductCard = styled.div`
  flex: 0 0 420px;
  background-color: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  
  @media (max-width: 480px) {
    flex: 0 0 330px;
  }
`;

const ProductImage = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${ProductCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: var(--primary);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: 50%;
  margin-right: 6px;
  animation: blink 2s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const ProductContent = styled.div`
  padding: 2rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary);
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, var(--primary), transparent);
  }
`;

const ProductDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
  color: var(--text);
`;

const FeatureDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: var(--primary);
  border-radius: 50%;
  margin-right: 10px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.7rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.primary ? 'var(--background)' : 'var(--text)'};
  border: 1px solid ${props => props.primary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 5px 15px rgba(0, 240, 255, 0.3)' : '0 5px 15px rgba(255, 255, 255, 0.05)'};
    background-color: ${props => props.primary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const CardDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  border-left: 1px solid rgba(0, 240, 255, 0.2);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  border-bottom-left-radius: 20px;
  opacity: 0.5;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: var(--primary);
  }
  
  &::before {
    width: 10px;
    height: 1px;
    top: 15px;
    right: 10px;
  }
  
  &::after {
    width: 1px;
    height: 10px;
    top: 10px;
    right: 15px;
  }
`;

const CTAContainer = styled.div`
  background-color: rgba(26, 26, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    min-width: auto;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, var(--primary), var(--tertiary));
  color: var(--background);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.7s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 240, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  opacity: 0;
  z-index: -1;
  background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15), transparent 70%);
  transition: opacity 0.5s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

export default Products; 