import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

const Research = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const gridRef = useRef(null);
  const dataRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');

      // Animate grid lines
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.grid-line'),
          { scaleX: 0 },
          { 
            scaleX: 1, 
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.inOut'
          }
        );

        gsap.fromTo(
          gridRef.current.querySelectorAll('.grid-line-vertical'),
          { scaleY: 0 },
          { 
            scaleY: 1, 
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.inOut'
          }
        );
      }

      // Animate data points
      if (dataRef.current) {
        gsap.fromTo(
          dataRef.current.children,
          { opacity: 0, scale: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)'
          }
        );
      }
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const researchAreas = [
    {
      id: 1,
      title: 'Neural Interface Systems',
      description: 'Developing advanced brain-machine interfaces for intuitive robot control and enhanced human-robot interaction.',
      progress: 85,
      icon: '🧠'
    },
    {
      id: 2,
      title: 'Swarm Intelligence',
      description: 'Exploring decentralized control systems that enable multiple robots to work together as coordinated units.',
      progress: 72,
      icon: '🐝'
    },
    {
      id: 3,
      title: 'Adaptive Learning Algorithms',
      description: 'Creating AI systems that continuously improve through real-world experience and environmental feedback.',
      progress: 94,
      icon: '📈'
    },
    {
      id: 4,
      title: 'Biomimetic Locomotion',
      description: 'Studying natural movement patterns to develop more efficient and versatile robotic mobility systems.',
      progress: 68,
      icon: '🦿'
    }
  ];

  return (
    <ResearchSection id="research" className="section">
      <GridBackground ref={gridRef}>
        {Array(10).fill().map((_, i) => (
          <div key={`h-${i}`} className="grid-line" style={{ top: `${i * 10}%` }} />
        ))}
        {Array(10).fill().map((_, i) => (
          <div key={`v-${i}`} className="grid-line-vertical" style={{ left: `${i * 10}%` }} />
        ))}
      </GridBackground>
      
      <DataPointsContainer ref={dataRef}>
        {Array(40).fill().map((_, i) => {
          const size = Math.random() * 6 + 2;
          return (
            <DataPoint 
              key={i} 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          );
        })}
      </DataPointsContainer>
      
      <Container 
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <ContentContainer>
          <motion.div variants={itemVariants}>
            <SectionLabel>R&D Initiatives</SectionLabel>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Heading>Future-Forward <AccentText>Research</AccentText></Heading>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Description>
              At DigiLeaf Technologies, our research division is dedicated to pushing the boundaries of 
              robotics and artificial intelligence. We invest heavily in exploratory research that drives 
              innovation and creates the foundation for tomorrow's robotic breakthroughs.
            </Description>
          </motion.div>
          
          <ResearchAreasGrid>
            {researchAreas.map((area) => (
              <ResearchCard 
                key={area.id} 
                as={motion.div} 
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px rgba(0, 240, 255, 0.15)'
                }}
              >
                <ResearchIconContainer>
                  <ResearchIcon>{area.icon}</ResearchIcon>
                </ResearchIconContainer>
                
                <ResearchContent>
                  <ResearchTitle>{area.title}</ResearchTitle>
                  <ResearchDescription>{area.description}</ResearchDescription>
                  
                  <ProgressContainer>
                    <ProgressLabel>Research Progress</ProgressLabel>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${area.progress}%` }} />
                      <ProgressValue>{area.progress}%</ProgressValue>
                    </ProgressBar>
                  </ProgressContainer>
                </ResearchContent>
                
                <ResearchDecoration />
              </ResearchCard>
            ))}
          </ResearchAreasGrid>
        </ContentContainer>
        
        <VisualizationContainer variants={itemVariants}>
          <ParticleSystemCanvas>
            <ParticleSystem />
            <ParticleCore />
            <CoreLabel>QUANTUM PHASE</CoreLabel>
            <SystemReading>
              <ReadingLabel>SIMULATION STATUS</ReadingLabel>
              <ReadingValue>ACTIVE</ReadingValue>
            </SystemReading>
            <SystemReading style={{ top: '60%' }}>
              <ReadingLabel>PROCESSING CORES</ReadingLabel>
              <ReadingValue>64</ReadingValue>
            </SystemReading>
            <SystemReading style={{ top: '70%' }}>
              <ReadingLabel>NEURAL PATHWAYS</ReadingLabel>
              <ReadingValue>487,932</ReadingValue>
            </SystemReading>
            <GridOverlay>
              {Array(8).fill().map((_, i) => (
                <OverlayLine key={i} style={{ left: `${i * 12.5}%` }} />
              ))}
              {Array(8).fill().map((_, i) => (
                <OverlayLine 
                  key={i + 8} 
                  style={{ 
                    top: `${i * 12.5}%`, 
                    width: '100%',
                    height: '1px'
                  }} 
                />
              ))}
            </GridOverlay>
          </ParticleSystemCanvas>
          
          <PublicationsContainer>
            <PublicationCard>
              <PublicationTitle>Adaptive Neural Networks for Autonomous Navigation</PublicationTitle>
              <PublicationMeta>Journal of Robotic Intelligence, 2023</PublicationMeta>
            </PublicationCard>
            <PublicationCard>
              <PublicationTitle>Energy-Efficient Path Planning for Delivery Robots in Urban Environments</PublicationTitle>
              <PublicationMeta>International Conference on Robotics & Automation, 2022</PublicationMeta>
            </PublicationCard>
            <PublicationsLink>View All Research Publications <Arrow>→</Arrow></PublicationsLink>
          </PublicationsContainer>
        </VisualizationContainer>
      </Container>
    </ResearchSection>
  );
};

const ResearchSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  .grid-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.03);
    transform-origin: left;
  }

  .grid-line-vertical {
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
    transform-origin: top;
  }
`;

const DataPointsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

const DataPoint = styled.div`
  position: absolute;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0.3;
  box-shadow: 0 0 5px var(--primary);
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
  position: relative;
  z-index: 3;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 650px;
  
  @media (max-width: 1200px) {
    max-width: 800px;
    width: 100%;
  }
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
  color: var(--text);
  
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
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ResearchAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ResearchCard = styled.div`
  background-color: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const ResearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.1);
  margin-bottom: 1.5rem;
`;

const ResearchIcon = styled.div`
  font-size: 2rem;
`;

const ResearchContent = styled.div`
  flex: 1;
`;

const ResearchTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const ResearchDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const ProgressContainer = styled.div`
  margin-top: auto;
`;

const ProgressLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(to right, var(--primary), var(--tertiary));
  border-radius: 3px;
`;

const ProgressValue = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
`;

const ResearchDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  opacity: 0.1;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: var(--primary);
  }
  
  &::before {
    top: 20px;
    right: 0;
    width: 50%;
    height: 1px;
  }
  
  &::after {
    top: 0;
    right: 20px;
    width: 1px;
    height: 50%;
  }
`;

const VisualizationContainer = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 1200px) {
    max-width: 800px;
    width: 100%;
  }
`;

const ParticleSystemCanvas = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #050505;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const ParticleSystem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
`;

const ParticleCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 240, 255, 0.8) 0%,
    rgba(0, 240, 255, 0.4) 40%,
    transparent 70%
  );
  animation: pulse 3s infinite alternate;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 20px 10px rgba(0, 240, 255, 0.3);
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      box-shadow: 0 0 40px 15px rgba(0, 240, 255, 0.5);
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;

const CoreLabel = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const OverlayLine = styled.div`
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(0, 240, 255, 0.05);
`;

const SystemReading = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  font-family: 'Courier New', monospace;
  z-index: 2;
`;

const ReadingLabel = styled.div`
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ReadingValue = styled.div`
  font-size: 1rem;
  color: var(--primary);
  font-weight: 600;
  letter-spacing: 1px;
`;

const PublicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PublicationCard = styled.div`
  background-color: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 240, 255, 0.2);
  }
`;

const PublicationTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const PublicationMeta = styled.div`
  font-size: 0.8rem;
  color: var(--primary);
`;

const PublicationsLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--primary);
  margin-top: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--tertiary);
  }
`;

const Arrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  
  ${PublicationsLink}:hover & {
    transform: translateX(5px);
  }
`;

export default Research; 