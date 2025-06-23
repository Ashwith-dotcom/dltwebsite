import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  const handleKarnaClick = () => {
    navigate('/karna');
  };

  // 3D animation setup
  useEffect(() => {
    // Canvas and scene setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 2.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Particles creation
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    // Create a reference array for original sizes
    const originalSizes = new Float32Array(particlesCount);
    
    // Populate data arrays
    for (let i = 0; i < particlesCount; i++) {
      // Position (3 values per particle)
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Color - only white and cyan (3 values per particle)
      if (Math.random() > 0.5) {
        // White
        colors[i3] = 1;      // R
        colors[i3 + 1] = 1;  // G
        colors[i3 + 2] = 1;  // B
      } else {
        // Cyan
        colors[i3] = 0;      // R
        colors[i3 + 1] = 1;  // G
        colors[i3 + 2] = 1;  // B
      }
      
      // Size (1 value per particle) - much smaller stars
      originalSizes[i] = Math.random() < 0.95 ? 
        0.5 + Math.random() * 0.5 :  // 95% small stars
        1.0 + Math.random() * 0.5;   // 5% slightly larger
      
      // Set initial sizes
      sizes[i] = originalSizes[i];
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Subtle rotation
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      // Add subtle twinkling effect
      const time = Date.now() * 0.001;
      const sizes = particlesGeometry.attributes.size.array;
      const colors = particlesGeometry.attributes.color.array;
      
      for (let i = 0; i < particlesCount; i++) {
        // Make about 15% of stars twinkle
        if (i % 7 === 0) {
          // Sine wave oscillation for twinkling (more subtle)
          const oscillation = Math.sin(time + i * 0.1) * 0.2 + 0.8;
          sizes[i] = originalSizes[i] * oscillation;
          
          // Make cyan stars pulse between cyan and slightly whiter cyan
          const i3 = i * 3;
          if (colors[i3] === 0) { // If it's cyan (R=0)
            // Pulsate R channel slightly for cyan stars (0 to 0.15)
            colors[i3] = Math.sin(time + i) * 0.075;
          }
        }
      }
      
      particlesGeometry.attributes.size.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Text animation with GSAP
    if (textRef.current) {
      const title = textRef.current.querySelector('h1');
      const subtitle = textRef.current.querySelector('h2');
      const cta = textRef.current.querySelector('.cta-button');
      
      gsap.fromTo(
        title, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo(
        subtitle, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
      
      gsap.fromTo(
        cta, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.8, delay: 1.2, ease: "back.out(1.7)" }
      );
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up resources
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <HeroSection id="home" className="section">
      <Canvas ref={canvasRef} />
      <ContentContainer ref={textRef}>
        <HeroContent>
          <Title>Pioneering the Future of</Title>
          <Subtitle>Robotic<AccentText> Intelligence</AccentText></Subtitle>
          <Description>
            DigiLeaf Technologies is at the forefront of robotics innovation, 
            creating the next generation of delivery and industrial robot solutions.
          </Description>
          <CTAButton onClick={handleKarnaClick} className="cta-button">Discover Our Karna</CTAButton>
        </HeroContent>
        
        <ScrollIndicator 
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0.4, 1, 0.4] 
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <span></span>
          <p>Scroll Down</p>
        </ScrollIndicator>
      </ContentContainer>
      
      <DiagnosticsPanel>
        <SystemStatus>SYSTEM ONLINE</SystemStatus>
        <StatusLine>UNIT DSC-V</StatusLine>
        <StatusLine>NEURAL LINK: ACTIVE</StatusLine>
        <StatusLine>MEMORY MODULE: ENGAGED</StatusLine>
        <StatusLine>ROBOTIC ARM STATUS: OPERATIONAL</StatusLine>
      </DiagnosticsPanel>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--background);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const HeroContent = styled.div`
  max-width: 650px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  color: var(--text);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  color: var(--text);
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const AccentText = styled.span`
  background: linear-gradient(to right, var(--primary), var(--tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary), var(--tertiary));
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 550px;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, var(--primary), var(--tertiary));
  color: var(--background);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  z-index: 10;
  
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

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span {
    display: block;
    width: 20px;
    height: 30px;
    border: 2px solid var(--primary);
    border-radius: 20px;
    margin-bottom: 8px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: var(--primary);
      border-radius: 50%;
      animation: scrollAnim 1.5s infinite;
    }
  }
  
  p {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-secondary);
  }
  
  @keyframes scrollAnim {
    0% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 12px);
      opacity: 0;
    }
  }
`;

const DiagnosticsPanel = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 5;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: var(--primary);
  text-transform: uppercase;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SystemStatus = styled.div`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--tertiary);
  position: relative;
  padding-left: 15px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: var(--tertiary);
    border-radius: 50%;
    animation: blink 2s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const StatusLine = styled.div`
  margin-bottom: 0.2rem;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`;

export default Hero; 