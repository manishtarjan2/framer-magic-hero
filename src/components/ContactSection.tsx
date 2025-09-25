import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ContactSection = () => {
  const handleBookCall = () => {
    // Add your booking logic here
    console.log('Book a call clicked');
  };

  return (
    <section className="relative bg-black py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%),
            linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(30, 41, 59, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)
          `
        }}
      />
      
      {/* Grid pattern background (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div 
          className="rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(99, 102, 241, 0.1) 25%,
                rgba(59, 130, 246, 0.08) 50%,
                rgba(30, 41, 59, 0.2) 75%,
                rgba(15, 23, 42, 0.4) 100%
              )
            `,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          {/* Subtle inner glow */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)
              `
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Main heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">Let AI do the Work so</span>
              <span className="block">you can Scale Faster</span>
            </h2>

            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
              Book a Call Today and Start Automating
            </p>

            {/* CTA Button */}
            <button
              onClick={handleBookCall}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                background: 'linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(99, 102, 241) 50%, rgb(79, 70, 229) 100%)',
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span className="flex items-center gap-2">
                Book a free call
                <ArrowUpRight 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </span>
              
              {/* Button hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl" />
          <div className="absolute top-1/4 right-1/3 w-28 h-28 rounded-full bg-violet-500/5 blur-xl" />
        </div>
      </div>

      {/* Additional background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default ContactSection;