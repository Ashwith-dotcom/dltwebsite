import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const RoboticsPlatform = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  const gridRef = useRef(null);
  const particlesRef = useRef(null);
  
  // Animate the background grid and particles
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Grid animation
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            stagger: 0.03,
            duration: 0.5,
            ease: 'power3.out'
          }
        );
      }
      
      // Particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.set(particles, { opacity: 0, scale: 0 });
        
        gsap.to(particles, {
          opacity: () => Math.random() * 0.6 + 0.2,
          scale: () => Math.random() * 0.6 + 0.5,
          duration: 2,
          stagger: 0.05,
          ease: 'power3.out',
          repeat: -1,
          repeatRefresh: true,
          yoyo: true
        });
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
  
  const featureVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: i * 0.1 + 0.3,
        ease: "easeOut" 
      }
    })
  };
  
  const features = [
    {
      icon: '🤖',
      title: 'Autonomous Navigation',
      description: 'Advanced pathfinding algorithms that allow our robots to navigate complex environments with ease.'
    },
    {
      icon: '🧠',
      title: 'AI Decision Making',
      description: 'Real-time decision making capabilities powered by our proprietary neural network systems.'
    },
    {
      icon: '🔌',
      title: 'Energy Efficiency',
      description: 'Optimized power management systems that extend operational time by up to 35%.'
    },
    {
      icon: '🔒',
      title: 'Enhanced Security',
      description: 'Military-grade encryption and physical security features to protect sensitive operations.'
    },
    {
      icon: '📡',
      title: 'Remote Monitoring',
      description: '24/7 remote monitoring capabilities with real-time diagnostics and performance metrics.'
    },
    {
      icon: '🌐',
      title: 'Cloud Integration',
      description: 'Seamless cloud connectivity for fleet management and over-the-air updates.'
    }
  ];

  return (
    <RoboticsSection id="robotics" className="section">
      <BackgroundGrid ref={gridRef}>
        {Array(100).fill().map((_, i) => (
          <GridCell key={i} />
        ))}
      </BackgroundGrid>
      
      <ParticlesContainer ref={particlesRef}>
        {Array(30).fill().map((_, i) => (
          <Particle 
            key={i} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}
      </ParticlesContainer>
      
      <Container 
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <ContentContainer>
          <motion.div variants={itemVariants}>
            <SectionLabel>Our Technology</SectionLabel>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Heading>The <AccentText>DigiLeaf</AccentText> Robotics Platform</Heading>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Description>
              Our robotics platform combines cutting-edge hardware with sophisticated AI algorithms to 
              create robots that can adapt to their environment and perform complex tasks with precision. 
              Each robot in our ecosystem is powered by our proprietary operating system, enabling 
              unprecedented levels of autonomy and efficiency.
            </Description>
          </motion.div>
          
          <FeaturesGrid>
            {features.map((feature, i) => (
              <FeatureCard 
                key={i} 
                as={motion.div} 
                custom={i}
                variants={featureVariants}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </ContentContainer>
        
        <VisualizationContainer variants={itemVariants}>
          <PlatformVisualization>
            <CircuitBoard />
            <PulsingCore />
            <DataStream>
              {Array(15).fill().map((_, i) => (
                <DataLine 
                  key={i} 
                  style={{
                    width: `${Math.random() * 40 + 20}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    top: `${i * 6.5}%`
                  }}
                />
              ))}
            </DataStream>
            <HologramDisplay>
              <HologramRing style={{ width: '60%', height: '60%', animationDelay: '0s' }} />
              <HologramRing style={{ width: '75%', height: '75%', animationDelay: '0.5s' }} />
              <HologramRing style={{ width: '90%', height: '90%', animationDelay: '1s' }} />
              <HologramCore />
            </HologramDisplay>
            <SystemStatus>SYSTEM DIAGNOSTICS: OPTIMAL</SystemStatus>
          </PlatformVisualization>
        </VisualizationContainer>
      </Container>
    </RoboticsSection>
  );
};

// Style components
const RoboticsSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: #030303;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  z-index: 1;
`;

const GridCell = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 240, 255, 0.03);
    opacity: 0;
  }
  
  &:nth-child(odd)::after {
    background-color: rgba(0, 240, 255, 0.01);
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 5;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    max-width: 800px;
    margin-bottom: 2rem;
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 240, 255, 0.15);
    border-color: rgba(0, 240, 255, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary);
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
`;

const VisualizationContainer = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 500px;
  }
`;

const PlatformVisualization = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 10px;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(10, 10, 10, 0.8));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 240, 255, 0.1);
`;

const CircuitBoard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px),
    linear-gradient(0deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
`;

const PulsingCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 4s infinite;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  
  &::before {
    width: 30px;
    height: 30px;
    background: rgba(0, 240, 255, 0.8);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
    animation: corePulse 2s infinite;
  }
  
  &::after {
    width: 60px;
    height: 60px;
    border: 2px solid rgba(0, 240, 255, 0.4);
    animation: ringExpand 3s infinite;
  }
  
  @keyframes corePulse {
    0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
  }
  
  @keyframes ringExpand {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }
`;

const DataStream = styled.div`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 200px;
  height: 80%;
`;

const DataLine = styled.div`
  position: absolute;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--primary), transparent);
  animation: dataFlow 4s linear infinite;
  opacity: 0.6;
  
  @keyframes dataFlow {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateX(100%); opacity: 0; }
  }
`;

const HologramDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HologramRing = styled.div`
  position: absolute;
  border: 1px dashed rgba(0, 240, 255, 0.4);
  border-radius: 50%;
  animation: rotateRing 10s linear infinite;
  
  @keyframes rotateRing {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }
`;

const HologramCore = styled.div`
  width: 40%;
  height: 40%;
  background-color: rgba(0, 240, 255, 0.2);
  border-radius: 50%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background-color: rgba(0, 240, 255, 0.6);
    border-radius: 50%;
    animation: coreBlink 2s infinite;
  }
  
  @keyframes coreBlink {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const SystemStatus = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
`;

export default RoboticsPlatform; 