import React, { useEffect, useRef, useState } from 'react';

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasIntersected]);

  return [ref, hasIntersected] as const;
};

// Blog Card Component
const BlogCard = ({ title, category, image, delay = 0 }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-500 cursor-pointer group ${
        hasIntersected 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8'
      }`}
      style={{
        transitionDelay: hasIntersected ? `${delay}ms` : '0ms'
      }}
    >
      {/* Blog Image */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-80 transition-opacity duration-300"
          style={{
            background: image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-700/50">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Read More Link */}
        <div className="flex items-center text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors duration-300">
          <span>Read More</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard = ({ title, category, image, excerpt }) => {
  const [ref, hasIntersected] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`col-span-1 md:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-500 cursor-pointer group ${
        hasIntersected 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8'
      }`}
    >
      <div className="grid md:grid-cols-2 h-full">
        {/* Image Section */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-80 transition-opacity duration-300"
            style={{
              background: image
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-700/50">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-gray-400 mb-6 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          {/* Read More Link */}
          <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-300">
            <span>Read Full Article</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Blog Page Component
const BlogPage = () => {
  const [headerRef, headerIntersected] = useIntersectionObserver();

  const blogPosts = [
    {
      title: "The Future of AI Automation: How It's Changing Business Operations",
      category: "Article",
      image: "linear-gradient(135deg, rgba(129, 74, 200, 0.8) 0%, rgba(75, 85, 180, 0.8) 50%, rgba(45, 95, 160, 0.8) 100%)",
      featured: true,
      excerpt: "Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency."
    },
    {
      title: "5 Must-Have AI Tools to Streamline Your Business Tasks",
      category: "Resources",
      image: "linear-gradient(135deg, rgba(223, 122, 254, 0.8) 0%, rgba(181, 96, 235, 0.8) 50%, rgba(139, 70, 216, 0.8) 100%)"
    },
    {
      title: "Building Custom Chatbots: A Complete Guide for Businesses",
      category: "Tutorial",
      image: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 50%, rgba(139, 92, 246, 0.8) 100%)"
    },
    {
      title: "ROI of AI Implementation: Real Case Studies",
      category: "Case Study",
      image: "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(52, 211, 153, 0.8) 50%, rgba(45, 212, 191, 0.8) 100%)"
    },
    {
      title: "Workflow Automation Best Practices for 2025",
      category: "Guide",
      image: "linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(251, 191, 36, 0.8) 50%, rgba(253, 224, 71, 0.8) 100%)"
    },
    {
      title: "Integration Strategies: Connecting AI with Existing Systems",
      category: "Technical",
      image: "linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(248, 113, 113, 0.8) 50%, rgba(252, 165, 165, 0.8) 100%)"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerIntersected 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          <div className="inline-block bg-gray-900/50 text-gray-300 px-4 py-2 rounded-full text-sm mb-6">
            Blog
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock AI Insights with Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Stay informed with the latest AI trends, insights, and strategies to drive
            innovation and business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <FeaturedBlogCard
            title={blogPosts[0].title}
            category={blogPosts[0].category}
            image={blogPosts[0].image}
            excerpt={blogPosts[0].excerpt}
          />

          {/* Regular Blog Cards */}
          {blogPosts.slice(1).map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              category={post.category}
              image={post.image}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto">
            Load More Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 text-center">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-8">
              Get the latest AI insights delivered straight to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;