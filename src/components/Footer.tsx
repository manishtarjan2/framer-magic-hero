import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import orbitLogo from "@/assets/orbit-logo.png";

const Footer = () => {
  return (
    <footer className="bg-orbit-dark border-t border-orbit-purple/20 px-6 pt-12 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Left Side - Logo, Tagline, Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={orbitLogo} alt="OrbIT Labs" className="w-8 h-8" />
              <span className="text-xl font-semibold text-orbit-text-primary">
                Orb<span className="text-orbit-purple">IT</span> Labs
              </span>
            </div>
            
            {/* Tagline */}
            <p className="text-orbit-text-muted text-sm max-w-sm">
              Xtract — Automate Smarter, Optimize Faster, and Grow Stronger.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-orbit-text-primary font-medium">Join our newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Input 
                  type="email" 
                  placeholder="name@email.com"
                  className="bg-orbit-card border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted flex-1"
                />
                <Button variant="orbit" className="px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Links</h4>
            <div className="space-y-3">
              <a href="#services" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Services
              </a>
              <a href="#process" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Process
              </a>
              <a href="#case-studies" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Case studies
              </a>
              <a href="#benefits" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Benefits
              </a>
              <a href="#pricing" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Pricing
              </a>
            </div>
          </div>
          
          {/* Pages Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Pages</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                About
              </Link>
              <Link to="/blog" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Blog
              </Link>
              <Link to="/contact" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Contact
              </Link>
              <Link to="/404" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                404
              </Link>
            </div>
          </div>
          
          {/* Socials Column */}
          <div className="space-y-4">
            <h4 className="text-orbit-text-primary font-medium">Socials</h4>
            <div className="space-y-3">
              <a href="#" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="block text-orbit-text-muted hover:text-orbit-purple transition-colors text-sm">
                Twitter
              </a>
            </div>
            

          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-orbit-purple/20 pt-4">
          <div className="flex justify-center items-center">
            <p className="text-orbit-text-muted text-sm">Created by OrbIT Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;