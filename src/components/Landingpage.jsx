import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';

const FRAME_COUNT = 192;

/**
 * LandingPage component that uses a scroll-based parallax effect with image frames.
 * Displays a cinematic sequence of frames with timed text overlays.
 */
function LandingPage() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload images for the scroll animation
  useEffect(() => {
    let loadedCount = 0;
    const loadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        // Vite serves public folder at root
        img.src = `/frames/frame_${String(i).padStart(4, '0')}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loadedCount++; // Still count to avoid sticking at 99%
        };
        imagesRef.current[i] = img;
      }
    };
    loadImages();
  }, []);

  // Sync canvas with current frame and window size
  useEffect(() => {
    const drawFrame = () => {
      if (!imagesLoaded || !canvasRef.current || !imagesRef.current[currentFrame]) return;
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = imagesRef.current[currentFrame];
      
      // Handle canvas sizing for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);

      // Clear and draw image with "cover" behavior
      context.clearRect(0, 0, rect.width, rect.height);
      
      const imgRatio = img.width / img.height;
      const canvasRatio = rect.width / rect.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgRatio > canvasRatio) {
        drawHeight = rect.height;
        drawWidth = rect.height * imgRatio;
        offsetX = (rect.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = rect.width;
        drawHeight = rect.width / imgRatio;
        offsetX = 0;
        offsetY = (rect.height - drawHeight) / 2;
      }
      
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    drawFrame();
    
    window.addEventListener('resize', drawFrame);
    return () => window.removeEventListener('resize', drawFrame);
  }, [currentFrame, imagesLoaded]);

  // Handle scroll to calculate frame index
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate which frame to show based on scroll percentage
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.ceil(scrollFraction * FRAME_COUNT))
      );
      
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => setCurrentFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading Screen
  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-3xl mb-6 animate-pulse">
          🥗
        </div>
        <h2 className="text-white text-2xl font-bold mb-4 tracking-tighter uppercase">ProteinBox Loading...</h2>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-out" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-gray-500 mt-4 font-mono text-sm">{loadingProgress}% COMPLETE</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white selection:bg-green-500 selection:text-black">
      <LandingNavbar />
      
      {/* Cinematic Canvas Background */}
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Main Content Sections (Layered on top of sticky canvas) */}
      <div className="relative z-10 antialiased">
        
        {/* Section 1: Intro - The Vision */}
        <section className="h-[250vh] flex flex-col items-center justify-center">
          <div 
            className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none"
            style={{ 
              opacity: currentFrame < 45 ? 1 : 0,
              transform: `scale(${Math.max(0.8, 1 - (currentFrame / 200))}) translateY(${-currentFrame * 0.5}px)`
            }}
          >
            <div className="bg-black/10 backdrop-blur-[2px] p-8 md:p-12 rounded-[3rem]">
              <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter shadow-black drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                PROTEIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">EVOLVED</span>
              </h1>
              <p className="text-xl md:text-3xl font-medium max-w-2xl mx-auto text-gray-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Stop guessing. Start growing. The ultimate companion for your nutrition journey.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Tracking - The Logic */}
        <section className="h-[250vh] flex flex-col items-center justify-center">
          <div 
            className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none"
            style={{ 
              opacity: currentFrame >= 60 && currentFrame < 115 ? 1 : 0,
              transform: currentFrame >= 60 && currentFrame < 115 
                ? `translateY(${(85 - currentFrame) * 2}px)` 
                : 'translateY(100px)'
            }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-8 md:p-16 rounded-[4rem] border border-white/5">
              <div className="inline-block px-4 py-1 bg-green-500/20 rounded-full border border-green-500/30 text-green-400 font-bold tracking-widest text-sm mb-6 uppercase">
                Precision Nutrition
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                KNOW YOUR <span className="text-green-500">NUMBERS</span>
              </h2>
              <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200 leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Our AI tracks your protein and calories in real-time. Whether you're bulking, cutting, or maintaining, we've got the data to back you up.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Delivery - The Solution */}
        <section className="h-[250vh] flex flex-col items-center justify-center">
          <div 
            className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-700 pointer-events-none"
            style={{ 
              opacity: currentFrame >= 135 && currentFrame < 185 ? 1 : 0,
              transform: currentFrame >= 135 && currentFrame < 185 
                ? `translateY(${(160 - currentFrame) * 2}px)` 
                : 'translateY(100px)'
            }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-8 md:p-16 rounded-[4rem] border border-white/5">
              <div className="inline-block px-4 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-400 font-bold tracking-widest text-sm mb-6 uppercase">
                Smart Delivery
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                GOAL <span className="text-blue-500 underline decoration-blue-500/50 underline-offset-8">UNLOCKED</span>
              </h2>
              <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200 leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Didn't hit your daily protein quota? We calculate exactly what you're missing and deliver a curated Protein Box right to your door.
              </p>
            </div>
          </div>
        </section>



        {/* Section 4: Final CTA - The Start */}
        <section className="h-screen flex flex-col items-center justify-center">
          <div 
            className="text-center px-4 transition-all duration-1000" 
            style={{ 
              opacity: currentFrame >= 188 ? 1 : 0, 
              transform: currentFrame >= 188 ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.9)' 
            }}
          >
            <div className="bg-black/60 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(34,197,94,0.15)] max-w-4xl mx-auto relative overflow-hidden group">
              {/* Decorative background element */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
              
              <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white">
                STAY <span className="text-green-500">POSITIVE.</span><br />
                GET <span className="text-white">STARTED.</span>
              </h2>
              <p className="text-xl md:text-3xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Health is a journey, and every gram of protein counts. You have the goal, we have the plan. Let's make it happen together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Link 
                  to="/login" 
                  className="px-16 py-6 bg-green-500 hover:bg-green-400 text-black font-black text-2xl rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] animate-bounce"
                >
                  START NOW
                </Link>
                <div className="text-gray-400 font-medium text-lg">
                  Ready to join? <Link to="/login" className="text-white hover:text-green-400 underline decoration-green-500/30 underline-offset-4 transition-all">Sign up today</Link>
                </div>
              </div>
              
              {/* Bottom detail */}
              <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Personalized Plans
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> AI Calculations
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Express Delivery
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Persistent Scroll indicator */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 ${currentFrame > 20 ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">Scroll to explore the future</span>
          <div className="w-[2px] h-16 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500 to-transparent animate-infinite-scroll" />
          </div>
        </div>
      </div>

      {/* Brand Watermark Overlay (Covers the original watermark) */}
      <div className="fixed bottom-6 right-8 z-50">
        <div className="bg-black p-1 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
          <div className="w-24 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-2xl font-black text-black tracking-tighter">PB</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infinite-scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}} />
    </div>
  );
}

export default LandingPage;