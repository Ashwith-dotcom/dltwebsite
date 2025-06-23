import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

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
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <AboutSection id="about" className="section">
      <GradientOverlay />
      
      <Container 
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <AboutContent>
          <motion.div variants={itemVariants}>
            <SectionLabel>About Us</SectionLabel>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Heading>Revolutionizing <AccentText>Robotics</AccentText> For a Smarter Future</Heading>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Description>
              At DigiLeaf Technologies, we're dedicated to pushing the boundaries of what's possible in robotics. 
              Founded on the principle of creating intelligent machines that enhance human capabilities, 
              our team of engineers, designers, and researchers work tirelessly to develop cutting-edge 
              robotic solutions for a wide range of industries.
            </Description>
            
            <Description>
              We specialize in delivery robots, industrial automation, and advanced robotics research & development. 
              Our proprietary AI systems and precise engineering enable our robots to navigate complex environments
              with unprecedented efficiency and reliability.
            </Description>
          </motion.div>
          
          <StatsContainer>
            <StatBox as={motion.div} variants={statsVariants}>
              <StatNumber>5+</StatNumber>
              <StatLabel>Years Experience</StatLabel>
            </StatBox>
            
            <StatBox as={motion.div} variants={statsVariants}>
              <StatNumber>15+</StatNumber>
              <StatLabel>Robot Models</StatLabel>
            </StatBox>
            
            <StatBox as={motion.div} variants={statsVariants}>
              <StatNumber>98%</StatNumber>
              <StatLabel>Delivery Success</StatLabel>
            </StatBox>
            
            <StatBox as={motion.div} variants={statsVariants}>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Technical Support</StatLabel>
            </StatBox>
          </StatsContainer>
        </AboutContent>
        
        <ImageContainer as={motion.div} variants={itemVariants}>
          <ParallaxImage 
            animate={{ 
              y: [0, -15, 0], 
              x: [0, 10, 0],
              rotateZ: [0, 2, 0]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <ImageOverlay />
          <DiagText>MODEL: HUMANOID-X1</DiagText>
          <CircleDecoration />
          <HexGrid>
            {Array(15).fill().map((_, i) => (
              <Hex 
                key={i} 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </HexGrid>
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 70%, rgba(5, 217, 232, 0.1), transparent 40%);
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const AboutContent = styled.div`
  flex: 1;
  max-width: 600px;
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
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatBox = styled.div`
  background-color: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 240, 255, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 550px;
  height: 550px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 500px;
    height: 500px;
  }
  
  @media (max-width: 576px) {
    height: 400px;
  }
`;

const ParallaxImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.cio.com/wp-content/uploads/2025/02/3829539-0-75501800-1740132217-shutterstock_2482705481.jpg?quality=50&strip=all');
  background-size: cover;
  background-position: center;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
`;

const DiagText = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  color: var(--primary);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
`;

const CircleDecoration = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 30px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 50%;
  z-index: 2;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px dashed var(--primary);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 4s infinite;
  }
  
  &::after {
    width: 40px;
    height: 40px;
    animation-delay: 2s;
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.8;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.2;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.8;
    }
  }
`;

const HexGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Hex = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  background-color: transparent;
  border: 1px solid var(--primary);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: fadeInOut 6s infinite;
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.4; }
  }
`;

export default About; 