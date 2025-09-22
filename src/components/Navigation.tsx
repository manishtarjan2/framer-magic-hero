import { Button } from "@/components/ui/button";
import orbitLogo from "@/assets/orbit-logo.png";

const Navigation = () => {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={orbitLogo} alt="OrbIT Labs" className="w-8 h-8" />
        <span className="text-xl font-semibold text-orbit-text-primary">
          Orb<span className="text-orbit-purple">IT</span> Labs
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-orbit-text-primary hover:text-orbit-purple transition-colors font-medium">
          Home
        </a>
        <a href="#" className="text-orbit-text-muted hover:text-orbit-purple transition-colors font-medium">
          About
        </a>
        <a href="#" className="text-orbit-text-muted hover:text-orbit-purple transition-colors font-medium">
          Blog
        </a>
        <a href="#" className="text-orbit-text-muted hover:text-orbit-purple transition-colors font-medium">
          Contact
        </a>
      </div>

      {/* CTA Button */}
      <Button variant="orbit" className="px-6 py-2 rounded-xl font-medium">
        Book a call
      </Button>
    </nav>
  );
};

export default Navigation;