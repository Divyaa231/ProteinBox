import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-xl font-bold text-white">
              🥗
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              ProteinBox
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
              }`}
            >
              About
            </button>
          </div>

          {/* Login */}
          <div className="flex items-center">
            <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;