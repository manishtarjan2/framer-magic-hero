import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import orbitLogo from "@/assets/orbit-logo.png";

const Navigation = () => {
  const location = useLocation();
  
  const getLinkClass = (path: string) => {
    return location.pathname === path 
      ? "text-orbit-text-primary hover:text-orbit-purple transition-colors font-medium"
      : "text-orbit-text-muted hover:text-orbit-purple transition-colors font-medium";
  };

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
        <Link to="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link to="/about" className={getLinkClass("/about")}>
          About
        </Link>
        <Link to="/blog" className={getLinkClass("/blog")}>
          Blog
        </Link>
        <Link to="/contact" className={getLinkClass("/contact")}>
          Contact
        </Link>
      </div>

      {/* CTA Button */}
      <Button variant="orbit" className="px-6 py-2 rounded-xl font-medium">
        Book a call
      </Button>
    </nav>
  );
};

export default Navigation;