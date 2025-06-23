import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'General Inquiry'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          name: '',
          email: '',
          company: '',
          message: '',
          subject: 'General Inquiry'
        });
      }, 3000);
    }, 1500);
  };

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

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.15,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const contactOptions = [
    {
      icon: '📍',
      title: 'Visit Us',
      info: '3-535, Ayyappa Society, Chanda Naik Nagar, Madhapur',
      subInfo: 'Hyderabad, Telangana'
    },
    {
      icon: '📞',
      title: 'Call Us',
      info: '8074296912',
      subInfo: 'Mon-Sat, 9AM-6PM IST',
      link: 'tel:+918074296912'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      info: 'contact@digileaf.co.in',
      subInfo: 'We reply within 24 hours',
      link: 'mailto:contact@digileaf.co.in'
    }
  ];

  return (
    <ContactSection id="contact" className="section">
      <DecorativeCircle 
        as={motion.div}
        variants={circleVariants}
        initial="hidden"
        animate={controls}
        style={{ top: '20%', right: '10%' }}
      />
      <DecorativeCircle 
        as={motion.div}
        variants={circleVariants}
        initial="hidden"
        animate={controls}
        style={{ bottom: '15%', left: '5%' }}
      />
      
      <Container 
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <ContentContainer>
          <motion.div variants={itemVariants}>
            <SectionLabel>Get In Touch</SectionLabel>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Heading>Let's Discuss Your <AccentText>Robotics</AccentText> Needs</Heading>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Description>
              Whether you're interested in our delivery robots, industrial automation solutions, 
              or exploring a custom robotics project, our team is ready to assist you. 
              Fill out the form, and one of our experts will get back to you shortly.
            </Description>
          </motion.div>
          
          <ContactOptionsContainer>
            {contactOptions.map((option, i) => (
              <ContactOption 
                key={i} 
                as={motion.div} 
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
              >
                <ContactIcon>{option.icon}</ContactIcon>
                <ContactTitle>{option.title}</ContactTitle>
                {option.link ? (
                  <ContactInfo as="a" href={option.link}>{option.info}</ContactInfo>
                ) : (
                  <ContactInfo>{option.info}</ContactInfo>
                )}
                <ContactSubInfo>{option.subInfo}</ContactSubInfo>
              </ContactOption>
            ))}
          </ContactOptionsContainer>
          
          <FollowContainer variants={itemVariants}>
            <FollowText>Follow us:</FollowText>
            <SocialLinks>
              <SocialIcon 
                as={motion.a} 
                href="https://in.linkedin.com/company/digileaftechnologies" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#00f0ff' }}
              >
                <i className="fab fa-linkedin"></i>
              </SocialIcon>
              <SocialIcon 
                as={motion.a} 
                href="https://www.instagram.com/digileaf_tech/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#00f0ff' }}
              >
                <i className="fab fa-instagram"></i>
              </SocialIcon>
            </SocialLinks>
          </FollowContainer>
        </ContentContainer>
        
        <FormContainer variants={itemVariants}>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Your Name</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                value={formState.name} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                value={formState.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com"
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormInput 
                  type="text" 
                  name="company" 
                  value={formState.company} 
                  onChange={handleChange}
                  placeholder="Your company"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Subject</FormLabel>
                <FormSelect 
                  name="subject" 
                  value={formState.subject} 
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Delivery Robots">Delivery Robots</option>
                  <option value="Industrial Automation">Industrial Automation</option>
                  <option value="Custom Solutions">Custom Solutions</option>
                  <option value="Partnership">Partnership</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea 
                name="message" 
                value={formState.message} 
                onChange={handleChange} 
                required 
                placeholder="Tell us about your project or inquiry..."
                rows="5"
              />
            </FormGroup>
            
            <FormButtonContainer>
              {isSuccess ? (
                <SuccessMessage 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Message sent successfully! We'll be in touch soon.
                </SuccessMessage>
              ) : (
                <SubmitButton 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>
              )}
            </FormButtonContainer>
          </ContactForm>
          
          <FormBackground />
        </FormContainer>
      </Container>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: var(--background);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0.1;
  z-index: 1;
  filter: blur(40px);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  
  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 550px;
  
  @media (max-width: 1100px) {
    max-width: 100%;
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

const ContactOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  /* Ensure all columns have equal width */
  & > * {
    width: 100%;
    min-width: 0;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactOption = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;
  
  /* Ensure all contact info has consistent width */
  & > div {
    width: 100%;
    white-space: normal;
    word-break: break-word;
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary);
`;

const ContactInfo = styled.div`
  font-size: 0.9rem;
  color: var(--text);
  margin-bottom: 0.3rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.as === 'a' ? 'var(--primary)' : 'var(--text)'};
  }
`;

const ContactSubInfo = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const FollowContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const FollowText = styled.div`
  font-size: 1rem;
  color: var(--text);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font-size: 1.2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 240, 255, 0.1);
  }
`;

const FormContainer = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  position: relative;
  
  @media (max-width: 1100px) {
    max-width: 100%;
    width: 100%;
  }
`;

const FormBackground = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: rgba(0, 240, 255, 0.05);
  z-index: -1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactForm = styled.form`
  background-color: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const formFieldStyles = `
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background-color: rgba(10, 10, 10, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--text);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormInput = styled.input`
  ${formFieldStyles}
`;

const FormTextarea = styled.textarea`
  ${formFieldStyles}
  resize: vertical;
  min-height: 120px;
`;

const FormSelect = styled.select`
  ${formFieldStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  option {
    background-color: var(--surface);
    color: var(--text);
  }
`;

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary), var(--tertiary));
  color: var(--background);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &::before {
      display: none;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(0, 240, 255, 0.1);
  border-left: 3px solid var(--primary);
  padding: 1rem 1.5rem;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 500;
`;

export default Contact; 