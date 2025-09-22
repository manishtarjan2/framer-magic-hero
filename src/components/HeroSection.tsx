import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import starfieldBg from "@/assets/starfield-bg.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${starfieldBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-purple-glow"></div>
      
      {/* Purple glow effect in center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orbit-purple opacity-20 blur-[150px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* New Badge */}
        <div className="inline-flex items-center space-x-3 bg-orbit-purple/20 backdrop-blur-sm border border-orbit-purple/30 rounded-full px-5 py-2 mb-12">
          <span className="bg-orbit-purple text-white px-3 py-1 rounded-full text-sm font-medium">
            New
          </span>
          <span className="text-orbit-text-primary text-sm font-medium">
            Automated Lead Generation
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-orbit-text-primary mb-8 leading-tight">
          Intelligent Automation for{" "}
          <br className="hidden lg:block" />
          Modern Businesses.
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-orbit-text-muted mb-12 max-w-4xl mx-auto leading-relaxed">
          Xtract brings AI automation to your fingertips & streamline tasks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            variant="orbit"
            size="lg"
            className="px-8 py-4 rounded-xl font-medium text-lg flex items-center space-x-2"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 rounded-xl font-medium text-lg"
          >
            View services
          </Button>
        </div>
      </div>

      {/* Side elements */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="rotate-90 origin-center">
          <Button 
            variant="orbit"
            className="px-6 py-3 rounded-xl font-medium flex items-center space-x-2"
          >
            <span>Use For Free</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom right elements */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 hidden lg:block">
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 mb-3"
        >
          <span>Another AI Template</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
          <span className="text-orbit-text-primary text-sm font-medium">Made in Framer</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;