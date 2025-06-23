import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import video1 from '../assets/1.mp4';
import video2 from '../assets/2.mp4';
import video3 from '../assets/3.mp4';
import video4 from '../assets/4.mp4';
import heroImage from '../assets/heroimage.jpg';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import video5 from '../assets/5.mp4';
import video6 from '../assets/6.mp4';
import video7 from '../assets/7.mp4';
import video8 from '../assets/8.mp4';
import video9 from '../assets/9.mp4';
import video10 from '../assets/10.mp4';


gsap.registerPlugin(ScrollTrigger);

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    background: white;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  #root {
    overflow-x: hidden !important;
  }

  * {
    box-sizing: border-box;
  }
`;

const Karna = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const gridRef = useRef(null);
  const videoRefs = useRef([]);
  const observerRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controllerVisible, setControllerVisible] = useState(false);
  const videoSectionRef = useRef(null);
  const gridImagesRef = useRef([]);
  const gridVideoRefs = useRef([]);

  // Form state for Book Now section
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call or email service here
  };

  const scrollToVideo = React.useCallback((index) => {
    if (!gridRef.current) return;
    
    const videoWidth = gridRef.current.children[0].offsetWidth;
    const gap = 24; // 1.5rem gap
    gridRef.current.scrollTo({
      left: index * (videoWidth + gap),
      behavior: 'smooth'
    });
    setCurrentVideo(index);
    
    // Ensure controller is visible
    setControllerVisible(true);
    
    // Play the new video immediately
    const video = videoRefs.current[index];
    if (video) {
      // Pause all videos first
      videoRefs.current.forEach(v => v?.pause());
      // Reset and play the target video
      video.currentTime = 0;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, []);

  const handlePlayPause = () => {
    const video = videoRefs.current[currentVideo];
    if (isPlaying) {
      video?.pause();
      setIsPlaying(false);
    } else {
      videoRefs.current.forEach((v, i) => {
        if (i !== currentVideo && v) v.pause();
      });
      video?.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // Handle Intersection Observer for auto-play on scroll and controller visibility
  useEffect(() => {
    if (!videoRefs.current.length) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        const videoIndex = videoRefs.current.indexOf(video);

        if (entry.isIntersecting) {
          // Show controller when video is in view
          setControllerVisible(true);
          setCurrentVideo(videoIndex);
          
          // Reset video if it ended
          if (video.ended) {
            video.currentTime = 0;
          }

          // Pause all other videos first
          videoRefs.current.forEach((v, i) => {
            if (i !== videoIndex && v) {
              v.pause();
              v.currentTime = 0; // Reset other videos
            }
          });

          // Play the intersecting video
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // If autoplay fails, at least show the first frame
            if (video.currentTime === 0) {
              video.currentTime = 0.1;
            }
          });
        } else {
          // Only hide controller if we're not intersecting with any videos
          const anyVideoIntersecting = entries.some(e => e.isIntersecting);
          if (!anyVideoIntersecting) {
            setControllerVisible(false);
          }
          // Don't hide the controller during video transitions
          
          // Pause video when it's not in view
          video.pause();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    // Observe all videos
    videoRefs.current.forEach(video => {
      if (video) observerRef.current.observe(video);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle video end events to automatically play the next video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.onended = () => {
          // Make sure controller stays visible
          setControllerVisible(true);
          const nextVideo = (index + 1) % videoRefs.current.length;
          scrollToVideo(nextVideo);
        };
      }
    });
  }, [scrollToVideo]);

  // Ensure the current video plays when currentVideo state changes
  useEffect(() => {
    // Play the current video when it changes
    const video = videoRefs.current[currentVideo];
    if (video) {
      // Reset and play the video
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // If autoplay fails, at least show the first frame
        if (video.currentTime === 0) {
          video.currentTime = 0.1;
        }
      });
    }
  }, [currentVideo]);

  // Handle scroll events to update current video
  useEffect(() => {
    // Pause all videos when switching
    const pauseAllVideos = () => {
      videoRefs.current.forEach(video => video?.pause());
      setIsPlaying(false);
    };

    let scrollTimeout;
    
    const handleScroll = () => {
      if (!gridRef.current) return;
      const scrollLeft = gridRef.current.scrollLeft;
      const videoWidth = gridRef.current.children[0].offsetWidth;
      const gap = 24; // 1.5rem gap
      const newIndex = Math.round(scrollLeft / (videoWidth + gap));
      
      if (newIndex !== currentVideo) {
        pauseAllVideos();
        setCurrentVideo(newIndex);
        // We don't need to play the video here as the currentVideo useEffect will handle that
      }
    };

    const grid = gridRef.current;
    grid?.addEventListener('scroll', handleScroll);
    
    return () => {
      grid?.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentVideo]);

  // Ensure controller stays visible during video playback
  useEffect(() => {
    // Keep controller visible whenever we have an active video
    if (videoRefs.current[currentVideo]) {
      setControllerVisible(true);
    }
  }, [currentVideo]);

  useEffect(() => {
    const contentWrapper = document.querySelector('.scrollable-content');
    const contentSection = document.querySelector('.content-section');
    const gridSection = document.querySelector('.grid-section');
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    // Animate both sections together as one unit
    gsap.fromTo(contentWrapper,
      {
        y: '100vh',
      },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: contentWrapper,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
        }
      }
    );

    // Remove individual section animations that might cause overlap
    // contentSection and gridSection will move together with contentWrapper

    // Hero section parallax
    gsap.to(heroImage, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Text animations
    const parallaxTexts = document.querySelectorAll('.parallax-text');
    
    parallaxTexts.forEach((text) => {
      gsap.fromTo(text,
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    
    const tl = gsap.timeline();
    
    // Initial state - full background
    gsap.set([topPanelRef.current, bottomPanelRef.current], {
      height: '100vh',
      width: '100%',
      y: 0
    });
    
    gsap.set(textRef.current, {
      opacity: 0,
      y: 20
    });

    // Animation sequence
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(textRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.5,
      delay: 0.5,
      ease: "power2.in"
    })
    // Split animation
    .to(topPanelRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: "power2.inOut"
    }, "split")
    .to(bottomPanelRef.current, {
      y: '100%',
      duration: 0.8,
      ease: "power2.inOut"
    }, "split")
    .set(loaderRef.current, {
      display: 'none'
    });


  }, []);

  useEffect(() => {
    const images = gridImagesRef.current;
    
    // Random positions and sizes for each image
    const positions = [
      { top: '5%', left: '5%', width: '30%', height: '45%' },
      { top: '5%', left: '38%', width: '25%', height: '35%' },
      { top: '5%', right: '5%', width: '28%', height: '40%' },
      { bottom: '5%', left: '8%', width: '25%', height: '40%' },
      { bottom: '5%', left: '36%', width: '30%', height: '45%' },
      { bottom: '5%', right: '5%', width: '25%', height: '35%' }
    ];

    images.forEach((img, index) => {
      if (img) {
        gsap.fromTo(img,
          {
            opacity: 0,
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }, []);

  // Gallery animations removed as requested

  // Add back the hover video functionality and keep the parallax animations
  useEffect(() => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Video hover functionality
    galleryItems.forEach((item, index) => {
      const video = gridVideoRefs.current[index];
      if (!video) return;
      
      item.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
      
      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
    
    return () => {
      galleryItems.forEach((item, index) => {
        const video = gridVideoRefs.current[index];
        if (!video) return;
        
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoaderContainer ref={loaderRef}>
        <Panel ref={topPanelRef} top />
        <Panel ref={bottomPanelRef} bottom />
        <LoaderText ref={textRef}>KARNA</LoaderText>
      </LoaderContainer>
      <MainContent>
        <HeroSection className="hero-section">
          <HeroImage className="hero-image" src={heroImage} alt="Hero Background" />
        
        </HeroSection>
        <ContentWrapper className="scrollable-content">
          <ContentSection className="content-section">
            <HighlightsHeading>Get the highlights.</HighlightsHeading>
            <VideoSection ref={videoSectionRef}>
              <VideoGrid ref={gridRef}>
                <VideoContainer>
                  <VideoWrapper>
                    <Video ref={el => videoRefs.current[0] = el} src={video1} playsInline muted />
                  </VideoWrapper>
                  <VideoTitle>Revolutionary design</VideoTitle>
                </VideoContainer>

                <VideoContainer>
                  <VideoWrapper>
                    <Video ref={el => videoRefs.current[1] = el} src={video2} playsInline muted />
                  </VideoWrapper>
                  <VideoTitle>30 Litres of storage</VideoTitle>
                </VideoContainer>

                <VideoContainer>
                  <VideoWrapper>
                    <Video ref={el => videoRefs.current[2] = el} src={video3} playsInline muted />
                  </VideoWrapper>
                  <VideoTitle>Inclination drive upto 30 degrees</VideoTitle>
                </VideoContainer>

                <VideoContainer>
                  <VideoWrapper>
                    <Video ref={el => videoRefs.current[3] = el} src={video4} playsInline muted />
                  </VideoWrapper>
                  <VideoTitle>Autonomous 5.0</VideoTitle>
                </VideoContainer>
              </VideoGrid>
              <VideoController visible={controllerVisible}>
                <PlayPauseButton onClick={handlePlayPause}>
                  <PlayIcon>{isPlaying ? '❚❚' : '▶'}</PlayIcon>
                </PlayPauseButton>
                <VideoProgressBar>
                  <ProgressIndicator active={currentVideo === 0} onClick={() => scrollToVideo(0)} />
                  <ProgressIndicator active={currentVideo === 1} onClick={() => scrollToVideo(1)} />
                  <ProgressIndicator active={currentVideo === 2} onClick={() => scrollToVideo(2)} />
                  <ProgressIndicator active={currentVideo === 3} onClick={() => scrollToVideo(3)} />
                </VideoProgressBar>
              </VideoController>
            </VideoSection>
          </ContentSection>
          <GridSection className="grid-section">
            <GridHeading className="grid-heading">Our Specs.</GridHeading>
            <GalleryGrid>
              {[
                { img: image1, video: video5, title: "Battery" },
                { img: image5, video: video6, title: "Wheels" },
                { img: image4, video: video7, title: "Speakers" },
                { img: image2, video: video8, title: "Screen" },
                { img: image3, video: video9, title: "Colored lights" },
                { img: image6, video: video10, title: "Depth camera" }
              ].map((item, index) => (
                <GalleryItem key={index} className="gallery-item">
                  <GalleryImage src={item.img} alt={`Gallery Item ${index + 1}`} />
                  <GalleryVideo 
                    ref={el => gridVideoRefs.current[index] = el} 
                    src={item.video} 
                    playsInline 
                    muted 
                    loop
                  />
                  <GalleryItemTitle>{item.title}</GalleryItemTitle>
                </GalleryItem>
              ))}
            </GalleryGrid>
          </GridSection>
          <BookNowSection>
            <BookNowContainer>
              <BookNowLeft>
                <BookNowHeading>Any customizations needed?</BookNowHeading>
                <BookNowContactList>
                  <BookNowContactItem>
                    <BookNowContactIcon>📞</BookNowContactIcon>
                    <BookNowContactDetails>
                      <BookNowContactLabel>Call us</BookNowContactLabel>
                      <BookNowContactValue>+91 8074296912</BookNowContactValue>
                    </BookNowContactDetails>
                  </BookNowContactItem>
                  <BookNowContactItem>
                    <BookNowContactIcon>📧</BookNowContactIcon>
                    <BookNowContactDetails>
                      <BookNowContactLabel>Mail us</BookNowContactLabel>
                      <BookNowContactValue>contact@digileaf.co.in</BookNowContactValue>
                    </BookNowContactDetails>
                  </BookNowContactItem>
                  <BookNowContactItem>
                    <BookNowContactIcon>📍</BookNowContactIcon>
                    <BookNowContactDetails>
                      <BookNowContactLabel>Find us</BookNowContactLabel>
                      <BookNowContactValue>3-535, Ayyappa Society, Chanda Naik Nagar, Madhapur
                      Hyderabad, Telangana</BookNowContactValue>
                    </BookNowContactDetails>
                  </BookNowContactItem>
                  <BookNowContactItem>
                    <BookNowContactIcon>⏰</BookNowContactIcon>
                    <BookNowContactDetails>
                      <BookNowContactLabel>Visit us</BookNowContactLabel>
                      <BookNowContactValue>Monday – Friday<br/>10AM – 6PM</BookNowContactValue>
                    </BookNowContactDetails>
                  </BookNowContactItem>
                </BookNowContactList>
              </BookNowLeft>
              <BookNowRight>
                <FormCard>
                  <FormTitle>Book Now / Enquiry.</FormTitle>
                  <BookingForm onSubmit={handleFormSubmit}>
                    <FormGrid>
                      <FormGroup>
                        <FormLabel htmlFor="name">Your name *</FormLabel>
                        <FormInput
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          placeholder="Enter name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="email">Your email *</FormLabel>
                        <FormInput
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          placeholder="Enter email"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="phonenumber">Your Phone Number</FormLabel>
                        <FormInput
                          type="text"
                          id="phonenumber"
                          name="phonenumber"
                          value={formData.phonenumber}
                          onChange={handleFormChange}
                          placeholder="Enter phone number"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="location">Location</FormLabel>
                        <FormInput
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location || ''}
                          onChange={handleFormChange}
                          placeholder="Enter your location"
                        />
                      </FormGroup>
                    </FormGrid>
                    <FormTextareaWrapper>
                      <FormLabel htmlFor="requirements">Message</FormLabel>
                      <FormTextarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleFormChange}
                        maxLength={250}
                        placeholder="Type here..."
                        required
                      />
                      <CharCount>{(formData.requirements || '').length}/250</CharCount>
                    </FormTextareaWrapper>
                    <SubmitButton type="submit">Send</SubmitButton>
                  </BookingForm>
                </FormCard>
              </BookNowRight>
            </BookNowContainer>
          </BookNowSection>
        </ContentWrapper>
      </MainContent>
    </>
  );
};

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  pointer-events: none;
`;

const Panel = styled.div`
  background-color: #565573;
  position: absolute;
  width: 100%;
  left: 0;
  ${props => props.top ? 'top: 0;' : ''}
  ${props => props.bottom ? 'bottom: 0;' : ''}
`;

const LoaderText = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: bold;
  z-index: 1001;
  white-space: nowrap;
`;

const MainContent = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 400vh;
`;

const HeroSection = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #3A3E7C;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 110vh;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: -5vh;
  left: 0;
  will-change: transform;
  transform: translateY(0);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 200vh;
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  background: white;
  min-height: 100vh;
  width: 100%;
  padding: 7rem 2rem;
  position: relative;
  transform-origin: top;
  will-change: transform;
  display: flex;
  flex-direction: column;
`;

const HighlightsHeading = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  color:rgb(80, 84, 143);
  margin-bottom: 5rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-left: 4.5rem;
`;

const VideoGrid = styled.div`
  display: flex;
  gap: 1.5rem; /* Reduced from 3rem to 1.5rem */
  width: 100%;
  margin: 0 auto;
  padding: 0 4rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Enable touch scrolling on mobile */
  -webkit-overflow-scrolling: touch;
`;

const VideoContainer = styled.div`
  flex: 0 0 80vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-snap-align: center;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background: #000;
  border-radius: 1.5rem;
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px;
`;

const VideoController = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  height: 44px;
  width: 180px;
  background: rgba(58, 62, 124, 0.8);
  border-radius: 22px;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 12px;
  z-index: 1000;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.visible ? 'all' : 'none'};
`;

const VideoProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
  flex-grow: 1;
  margin: 0 16px;
`;

const ProgressIndicator = styled.div`
  width: ${props => props.active ? '20px' : '5px'};
  height: 5px;
  border-radius: ${props => props.active ? '2.5px' : '50%'};
  background: ${props => props.active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)'};
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
`;



const PlayPauseButton = styled.div`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 4px;
`;

const PlayIcon = styled.span`
  color: #3A3E7C;
  font-size: 0.9rem;
  margin-left: 1px;
  line-height: 1;
`;

const VideoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 1.5rem 0 0 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.02em;
`;

const ParallaxText = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 3.5rem;
    color: #000;
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  h3 {
    font-size: 2.8rem;
    color: #000;
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  p {
    font-size: 1.2rem;
    color: #333;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  z-index: 100;
  background: transparent;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin-left: 200px;
  margin-right: 200px;
  padding: 0;
  gap: 4rem;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: #565573;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #565573;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: white;
    
    &::after {
      transform: scaleX(1);
      transform-origin: left;
      background-color: white;
    }
  }
`;

const GridSection = styled.section`
  background: black;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 7rem;

  padding-left: 2rem;
  padding-right: 2rem;
  transform-origin: top;
  will-change: transform;
`;

const GridHeading = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  color: white;
  margin-bottom: 3rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0 0 0 4.5rem; /* Added padding to the heading instead */
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 1rem; /* Added reduced gap between grid items */
  padding: 0 4.5rem 4.5rem;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 9/16;
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 100%;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: scale(1.03);
    
    video {
      opacity: 1;
    }
    
    img {
      opacity: 0;
    }
  }
`;

const GalleryImage = styled.img`
  width: 90%;
  height: 80%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  border-radius: 1rem;
  margin: 5%;
`;

const GalleryVideo = styled.video`
  width: 90%;
  height: 80%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  border-radius: 1rem;
  margin: 5%;
`;

const GalleryItemTitle = styled.h3`
  position: absolute;
  bottom: 17%;
  left: 5%;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  font-size: 1.2rem;
  border-radius: 1rem;
  font-weight: 500;
  margin: 0;
  z-index: 2;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const BookNowSection = styled.section`
  background: #f7f8fa;
  min-height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const BookNowContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(80,84,143,0.08);
  overflow: hidden;
  margin: 4rem 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: unset;
  }
`;

const BookNowLeft = styled.div`
  flex: 1;
  background: white;
  padding: 4rem 3rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    padding: 2rem;
  }
`;

const BookNowHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color:rgb(80, 84, 143);
  margin-bottom: 2.5rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const BookNowContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookNowContactItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const BookNowContactIcon = styled.span`
  font-size: 1.3rem;
  margin-right: 1.2rem;
  color: #565573;
  margin-top: 0.2rem;
`;

const BookNowContactDetails = styled.div`
  color: #181a2a;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const BookNowContactLabel = styled.div`
  font-weight: 600;
  color: #565573;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const BookNowContactValue = styled.div`
  font-size: 1.1rem;
`;

const BookNowRight = styled.div`
  flex: 1.2;
  background: #f7f8fa;
  padding: 4rem 4rem 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    padding: 2rem;
  }
`;

const FormCard = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(80,84,143,0.07);
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(80, 84, 143);
  margin-bottom: 2rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const BookingForm = styled.form`
  width: 100%;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #565573;
  margin-bottom: 0.5rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 0.7rem;
  background: #f7f8fa;
  color: #181a2a;
  font-size: 1rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #565573;
    background: #fff;
  }
`;

const FormTextareaWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 0.7rem;
  background: #f7f8fa;
  color: #181a2a;
  font-size: 1rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 110px;
  resize: vertical;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #565573;
    background: #fff;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.9rem 0;
  width: 120px;
  border: none;
  border-radius: 0.7rem;
  background: #181a2a;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  box-shadow: 0 2px 8px rgba(80,84,143,0.08);
  &:hover {
    background: #565573;
    transform: translateY(-2px);
  }
`;

export default Karna;
