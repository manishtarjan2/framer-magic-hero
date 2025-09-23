import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import starfieldBg from "@/assets/starfield-bg.jpg";
import { useWritingEffect } from '@/hooks/use-writing-effect';
import { useSlideReveal } from '@/hooks/use-slide-reveal';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Writing effect for badge only
  const badgeEffect = useWritingEffect("Automated Lead Generation", {
    speed: 80,
    delay: 500,
    trigger: 'scroll'
  });

  // Slide reveal effects for main content
  const headlineReveal = useSlideReveal({
    delay: 800,
    duration: 1200,
    trigger: 'scroll'
  });

  const subtitleReveal = useSlideReveal({
    delay: 1200,
    duration: 1000,
    trigger: 'scroll'
  });

  const buttonsReveal = useSlideReveal({
    delay: 1600,
    duration: 800,
    trigger: 'scroll'
  });

  // Star particle interface
  interface StarParticle {
    x: number;
    y: number;
    z: number;
    size: number;
    speed: number;
    color: string;
  }

  // Array to hold star particles
  const stars: StarParticle[] = [];

  // Function to create a star for the space travel effect
  const createStar = (): StarParticle => {
    // Random position across the screen, but with z starting close
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, z: 0, size: 0, speed: 0, color: '' };
    
    const x = Math.random() * canvas.width - canvas.width / 2;
    const y = Math.random() * canvas.height - canvas.height / 2;
    // Start close and move away
    const z = Math.random() * 100 + 10;
    
    // Different speeds for parallax effect (reduced by 1/3 for slower movement)
    const speed = (Math.random() * 6 + 2) * 0.67;
    
    // Pure white color for maximum contrast
    const color = 'rgb(255, 255, 255)'; // Pure white
    
    return { x, y, z, size: 2, speed, color }; // Fixed size of 0.8 pixels
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize stars
    const init = () => {
      // Increased number of stars for a more rich effect
      for (let i = 0; i < 1000; i++) {
        stars.push(createStar());
      }
    };

    // Animation loop - star drawing and updating section
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars for space travel effect
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 - 6; // Shift center 6px toward top
      
      // Add slight offset based on mouse position for interactive feel
      const offsetX = mouseRef.current.x * 0.05;
      const offsetY = mouseRef.current.y * 0.05;
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Move the star away (increasing z)
        star.z += star.speed;
        
        // If the star is too far, reset it to close distance
        if (star.z >= 3000) {
          stars[i] = createStar();
          continue;
        }
        
        // Project 3D position to 2D screen space with mouse influence
        const projectedX = centerX + ((star.x + offsetX * (1000 / star.z)) / star.z) * 1000;
        const projectedY = centerY + ((star.y + offsetY * (1000 / star.z)) / star.z) * 1000;
        
        // Calculate size based on distance (closer = bigger, but keep it smaller overall)
        const projectedSize = (star.size * 800) / star.z;
        
        // Calculate opacity based on distance - increased multiplier for brighter particles
        const opacity = Math.min(1.0, 2500 / star.z);
        
        // Set global alpha for better contrast control
        ctx.globalAlpha = opacity;
        
        // Draw single particle - no glow effect, just the core
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = star.color; // Use pure rgb(255, 255, 255)
        ctx.fill();
        
        // Reset global alpha
        ctx.globalAlpha = 1.0;
      }
      
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ 
        backgroundImage: `url(${starfieldBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay to increase black intensity */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      {/* 3D Star Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-5 pointer-events-none"
        style={{ background: 'transparent' }}
      />
      
      {/* Void center - beneath all circles */}
      <div 
        className="absolute z-0 pointer-events-none"
        style={{
          width: '150px',
          height: '150px',
          display: 'block',
          backgroundColor: '#000000',
          overflow: 'visible',
          position: 'absolute',
          borderRadius: '296px',
          bottom: 'calc(20% + 7rem)',
          left: '30%',
          transform: 'translate(-50%, 50%)'
        }}
      ></div>
      
      {/* Black hole effect - Big rotating circle */}
      <div 
        className="absolute animate-spin-slow z-0 pointer-events-none"
        style={{
          bottom: 'calc(20% + 7rem)',
          left: '30%',
          transform: 'translate(-50%, 50%)',
          width: '300px',
          height: '300px',
          display: 'block',
          background: 'linear-gradient(229deg, #df7afe 13%, rgba(201, 110, 240, 0) 35.0235827429153%, rgba(164, 92, 219, 0) 64.17244225559735%, rgb(129, 74, 200) 88%)',
          overflow: 'hidden',
          gap: '10px',
          aspectRatio: '1 / 1',
          borderRadius: '363px',
          animationDuration: '20s'
        }}
      ></div>
      
      {/* Black hole effect - Small rotating circle (perpendicular gradient) */}
      <div 
        className="absolute animate-spin-reverse z-0 pointer-events-none"
        style={{
          bottom: 'calc(20% + 12rem)',
          left: '40%',
          transform: 'translate(-50%, 50%)',
          width: '200px',
          height: '200px',
          display: 'block',
          background: 'linear-gradient(141deg, #df7afe 13%, rgba(201, 110, 240, 0) 35.0235827429153%, rgba(164, 92, 219, 0) 64.17244225559735%, rgb(129, 74, 200) 88%)',
          overflow: 'hidden',
          aspectRatio: '1 / 1',
          borderRadius: '363px',
          animationDuration: '15s'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
        {/* New Badge */}
        <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-orbit-purple/20 backdrop-blur-sm border border-orbit-purple/30 rounded-full px-3 sm:px-5 py-2 mb-8 sm:mb-12 mx-4 relative z-30">
          <span className="bg-orbit-purple text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            New
          </span>
          <span ref={badgeEffect.ref} className="text-orbit-text-primary text-xs sm:text-sm font-medium">
            {badgeEffect.displayedText}
            {badgeEffect.isWriting && <span className="writing-cursor"></span>}
          </span>
        </div>

        {/* Main Headline */}
        <h1 ref={headlineReveal.ref as React.RefObject<HTMLHeadingElement>} className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-orbit-text-primary mb-6 sm:mb-8 leading-tight sm:leading-loose px-4 ${headlineReveal.isRevealed ? 'slide-reveal' : 'opacity-0'}`}>
          Intelligent Automation for{' '}
          <br className="hidden lg:block my-4 sm:my-8" />
          Modern Businesses.
        </h1>

        {/* Subtitle */}
        <p ref={subtitleReveal.ref as React.RefObject<HTMLParagraphElement>} className={`text-sm sm:text-base md:text-lg text-orbit-text-muted mb-10 sm:mb-14 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 ${subtitleReveal.isRevealed ? 'slide-reveal-delayed' : 'opacity-0'}`}>
          ObrIT Labs brings AI automation to your fingertips & streamline tasks.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsReveal.ref as React.RefObject<HTMLDivElement>} className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4 ${buttonsReveal.isRevealed ? 'slide-reveal-buttons' : 'opacity-0'}`}>
          <Button 
            variant="orbit"
            size="lg"
            className="font-medium text-sm sm:text-base lg:text-lg flex items-center space-x-2 w-full sm:w-auto relative z-30"
            style={{
              boxSizing: 'border-box',
              width: 'min-content',
              height: 'min-content',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 12px',
              boxShadow: '0px 0.7065919983928324px 0.7065919983928324px -0.625px rgba(0, 0, 0, 0.15), 0px 1.8065619053231785px 1.8065619053231785px -1.25px rgba(0, 0, 0, 0.14), 0px 3.6217592146567767px 3.6217592146567767px -1.875px rgba(0, 0, 0, 0.14), 0px 6.8655999097303715px 6.8655999097303715px -2.5px rgba(0, 0, 0, 0.13), 0px 13.646761411524492px 13.646761411524492px -3.125px rgba(0, 0, 0, 0.1), 0px 30px 30px -3.75px rgba(0, 0, 0, 0.05)',
              overflow: 'visible',
              alignContent: 'center',
              flexWrap: 'nowrap',
              gap: '10px',
              position: 'relative',
              borderRadius: '6px',
              border: '1px solid var(--token-6839e435-35f3-4ab3-b723-e98c27e525bc, rgba(255, 255, 255, 0.1))'
            }}
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="font-medium text-sm sm:text-base lg:text-lg w-full sm:w-auto relative z-30"
            style={{
              boxSizing: 'border-box',
              width: 'min-content',
              height: 'min-content',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 12px',
              boxShadow: '0px 0.7065919983928324px 0.7065919983928324px -0.625px rgba(0, 0, 0, 0.15), 0px 1.8065619053231785px 1.8065619053231785px -1.25px rgba(0, 0, 0, 0.14), 0px 3.6217592146567767px 3.6217592146567767px -1.875px rgba(0, 0, 0, 0.14), 0px 6.8655999097303715px 6.8655999097303715px -2.5px rgba(0, 0, 0, 0.13), 0px 13.646761411524492px 13.646761411524492px -3.125px rgba(0, 0, 0, 0.1), 0px 30px 30px -3.75px rgba(0, 0, 0, 0.05)',
              overflow: 'visible',
              alignContent: 'center',
              flexWrap: 'nowrap',
              gap: '10px',
              position: 'relative',
              borderRadius: '6px',
              border: '1px solid var(--token-6839e435-35f3-4ab3-b723-e98c27e525bc, rgba(255, 255, 255, 0.1))'
            }}
          >
            View services
          </Button>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;