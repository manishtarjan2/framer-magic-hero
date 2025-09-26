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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-6 max-w-8xl mx-auto h-[60px] bg-orbit-dark bg-opacity-95 backdrop-blur-md shadow-md">
      {/* Logo */}
      <div
        style={{
          width: "190px",
          height: "60px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100px",
          overflow: "visible",
          padding: 0,
          alignContent: "center",
          flexWrap: "nowrap",
          gap: "10px",
          backgroundImage: `url(${orbitLogo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: 0,
        }}
        aria-label="OrbIT Labs logo"
      />

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 h-full">
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
      <div className="flex items-center h-full">
        <Button variant="orbit" className="px-6 py-2 rounded-lg font-medium h-[40px] flex items-center overflow-hidden group relative" style={{height: '40px'}}>
          <span className="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
            Book a call
          </span>
          <span className="block absolute left-0 right-0 top-full transition-transform duration-500 translate-y-0 group-hover:translate-y-[-150%] group-hover:opacity-100 opacity-0">
            Book a call
          </span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;