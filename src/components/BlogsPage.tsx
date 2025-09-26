import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

// Intersection Observer Hook
const useIntersectionObserver = (options = {}): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [hasIntersected]);

  return [ref, hasIntersected] as const;
};

// Blog Card Component
const BlogCard: React.FC<{
  title: string;
  category: string;
  image: string;
  delay?: number;
  onReadMore?: () => void;
}> = ({ title, category, image, delay = 0, onReadMore }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`bg-orbit-card backdrop-blur-sm border border-orbit-purple/20 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orbit-purple/40 transition-all duration-500 cursor-pointer group ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: hasIntersected ? `${delay}ms` : '0ms' }}
    >
      {/* Blog Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-orbit-text-primary mb-3 leading-tight group-hover:text-orbit-purple transition-colors duration-300">
          {title}
        </h3>

        {/* Read More */}
        <div
          className="flex items-center text-orbit-purple font-medium text-sm group-hover:text-orbit-purple-glow cursor-pointer transition-colors"
          onClick={onReadMore}
        >
          <span>Read More</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Featured Blog Card
const FeaturedBlogCard: React.FC<{
  title: string;
  category: string;
  image: string;
  excerpt?: string;
  onReadMore?: () => void;
}> = ({ title, category, image, excerpt, onReadMore }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`col-span-2 bg-orbit-card backdrop-blur-sm border border-orbit-purple/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orbit-purple/40 transition-all duration-500 cursor-pointer group ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid md:grid-cols-2 h-full">
        {/* Image Section */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-orbit-text-primary mb-4 leading-tight group-hover:text-orbit-purple transition-colors">
            {title}
          </h3>
          {excerpt && <p className="text-orbit-text-muted mb-6 leading-relaxed">{excerpt}</p>}
          <div
            className="flex items-center text-orbit-purple font-medium group-hover:text-orbit-purple-glow cursor-pointer"
            onClick={onReadMore}
          >
            <span>Read Full Article</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Page
const BlogPage: React.FC = () => {
  const heroHeading = useHeadingReveal({ direction: 'slide-right', delay: 300 });
  const heroSubheading = useHeadingReveal({ direction: 'slide-right', delay: 600 });
  const newsletterHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const [headerRef, headerIntersected] = useIntersectionObserver();
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const blogPosts = [
    {
      title: "The Future of AI Automation: How It's Changing Business Operations",
      category: "Article",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
      featured: true,
      excerpt: "Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency.",
      date: "March 15, 2024"
    },
    {
      title: "5 Must-Have AI Tools to Streamline Your Business Tasks",
      category: "Resources",
      image: "https://th.bing.com/th/id/OIP.ER0Ce2g7Km6tGgOdbIp_OAHaEO?w=287&h=180&c=7&r=0&o=7&dpr=1.7&pid=1.7&rm=3",
      excerpt: "Discover essential AI tools that can transform your daily business operations and boost productivity.",
      date: "March 12, 2024"
    },
    {
      title: "Building Custom Chatbots: A Complete Guide for Businesses",
      category: "Tutorial",
      image: "src\assets\customBot.jpeg",
      excerpt: "Step-by-step guide to creating powerful chatbots tailored to your business needs.",
      date: "March 10, 2024"
    },
    {
      title: "ROI of AI Implementation: Real Case Studies",
      category: "Case Study",
      image: "https://images.unsplash.com/photo-1665686300791-6b1c9d3a8b98?auto=format&fit=crop&w=1400&q=80",
      excerpt: "Learn from real-world examples how AI implementation drives measurable business results.",
      date: "March 8, 2024"
    },
    {
      title: "Workflow Automation Best Practices for 2025",
      category: "Guide",
      image: "https://images.unsplash.com/photo-1634942536969-3ac3e07258ae?auto=format&fit=crop&w=1400&q=80",
      excerpt: "Master the art of workflow automation with proven strategies for the modern workplace.",
      date: "March 5, 2024"
    },
    {
      title: "Integration Strategies: Connecting AI with Existing Systems",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1627430109212-57f075444efb?auto=format&fit=crop&w=1400&q=80",
      excerpt: "Technical insights on seamlessly integrating AI solutions with your current infrastructure.",
      date: "March 3, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-orbit-card border border-orbit-purple/20 text-orbit-text-muted px-4 py-2 rounded-full text-sm mb-6">
            Blog
          </div>
          <h1 ref={heroHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${heroHeading.animationClasses}`}>
            Unlock AI Insights with Us
          </h1>
          <p ref={heroSubheading.ref as React.RefObject<HTMLParagraphElement>} className={`text-orbit-text-muted text-lg max-w-2xl mx-auto leading-relaxed ${heroSubheading.animationClasses}`}>
            Stay informed with the latest AI trends, insights, and strategies to drive innovation and business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedBlogCard {...blogPosts[0]} onReadMore={() => setSelectedPost(blogPosts[0])} />
          {blogPosts.slice(1).map((post, i) => (
            <BlogCard key={i} {...post} delay={i * 100} onReadMore={() => setSelectedPost(post)} />
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 text-center">
          <div className="bg-orbit-card/30 backdrop-blur-sm border border-orbit-purple/20 rounded-2xl p-12 max-w-2xl mx-auto">
            <h3 ref={newsletterHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-2xl font-bold mb-4 ${newsletterHeading.animationClasses}`}>Stay Updated</h3>
            <p className="text-orbit-text-muted mb-8">
              Get the latest AI insights delivered straight to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-orbit-card border border-orbit-purple/20 rounded-lg text-orbit-text-primary placeholder:text-orbit-text-muted focus:outline-none focus:ring-2 focus:ring-orbit-purple focus:border-transparent" />
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
