import React, { useEffect, useRef, useState } from 'react';
import Footer from './Footer';

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
      className={`bg-orbit-card backdrop-blur-sm border border-orbit-purple/20 rounded-2xl overflow-hidden hover:border-orbit-purple/40 transition-all duration-500 cursor-pointer group ${
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
        <div className="absolute inset-0 bg-gradient-to-t from-orbit-dark/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-orbit-dark/80 backdrop-blur-sm text-orbit-text-muted px-3 py-1 rounded-full text-xs font-medium border border-orbit-purple/20">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-orbit-text-primary mb-3 leading-tight group-hover:text-orbit-purple transition-colors duration-300">
          {title}
        </h3>
        
        {/* Read More Link */}
        <div 
          className="flex items-center text-orbit-purple font-medium text-sm group-hover:text-orbit-purple-glow transition-colors duration-300 cursor-pointer"
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

// Featured Blog Card Component
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
      className={`col-span-2 bg-orbit-card backdrop-blur-sm border border-orbit-purple/20 rounded-2xl overflow-hidden hover:border-orbit-purple/40 transition-all duration-500 cursor-pointer group ${
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
          <div className="absolute inset-0 bg-gradient-to-r from-orbit-dark/20 via-transparent to-orbit-dark/80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-orbit-dark/80 backdrop-blur-sm text-orbit-text-muted px-3 py-1 rounded-full text-xs font-medium border border-orbit-purple/20">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-orbit-text-primary mb-4 leading-tight group-hover:text-orbit-purple transition-colors duration-300">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-orbit-text-muted mb-6 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          {/* Read More Link */}
          <div 
            className="flex items-center text-orbit-purple font-medium group-hover:text-orbit-purple-glow transition-colors duration-300 cursor-pointer"
            onClick={onReadMore}
          >
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
const BlogPage: React.FC = () => {
  const [headerRef, headerIntersected] = useIntersectionObserver();
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const blogPosts = [
    {
      title: "The Future of AI Automation: How It's Changing Business Operations",
      category: "Article",
      image: "linear-gradient(135deg, rgba(129, 74, 200, 0.8) 0%, rgba(75, 85, 180, 0.8) 50%, rgba(45, 95, 160, 0.8) 100%)",
      featured: true,
      excerpt: "Explore how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency.",
      date: "March 15, 2024"
    },
    {
      title: "5 Must-Have AI Tools to Streamline Your Business Tasks",
      category: "Resources",
      image: "linear-gradient(135deg, rgba(223, 122, 254, 0.8) 0%, rgba(181, 96, 235, 0.8) 50%, rgba(139, 70, 216, 0.8) 100%)",
      excerpt: "Discover essential AI tools that can transform your daily business operations and boost productivity.",
      date: "March 12, 2024"
    },
    {
      title: "Building Custom Chatbots: A Complete Guide for Businesses",
      category: "Tutorial",
      image: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 50%, rgba(139, 92, 246, 0.8) 100%)",
      excerpt: "Step-by-step guide to creating powerful chatbots tailored to your business needs.",
      date: "March 10, 2024"
    },
    {
      title: "ROI of AI Implementation: Real Case Studies",
      category: "Case Study",
      image: "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(52, 211, 153, 0.8) 50%, rgba(45, 212, 191, 0.8) 100%)",
      excerpt: "Learn from real-world examples how AI implementation drives measurable business results.",
      date: "March 8, 2024"
    },
    {
      title: "Workflow Automation Best Practices for 2025",
      category: "Guide",
      image: "linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(251, 191, 36, 0.8) 50%, rgba(253, 224, 71, 0.8) 100%)",
      excerpt: "Master the art of workflow automation with proven strategies for the modern workplace.",
      date: "March 5, 2024"
    },
    {
      title: "Integration Strategies: Connecting AI with Existing Systems",
      category: "Technical",
      image: "linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(248, 113, 113, 0.8) 50%, rgba(252, 165, 165, 0.8) 100%)",
      excerpt: "Technical insights on seamlessly integrating AI solutions with your current infrastructure.",
      date: "March 3, 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary">
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
          <div className="inline-block bg-orbit-card border border-orbit-purple/20 text-orbit-text-muted px-4 py-2 rounded-full text-sm mb-6">
            Blog
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Unlock AI Insights with Us
          </h1>
          <p className="text-orbit-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
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
            onReadMore={() => setSelectedPost(blogPosts[0])}
          />

          {/* Regular Blog Cards */}
          {blogPosts.slice(1).map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              category={post.category}
              image={post.image}
              delay={index * 100}
              onReadMore={() => setSelectedPost(post)}
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
          <div className="bg-orbit-card/30 backdrop-blur-sm border border-orbit-purple/20 rounded-2xl p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-orbit-text-muted mb-8">
              Get the latest AI insights delivered straight to your inbox. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-orbit-card border border-orbit-purple/20 rounded-lg text-orbit-text-primary placeholder:text-orbit-text-muted focus:outline-none focus:ring-2 focus:ring-orbit-purple focus:border-transparent transition-all duration-200"
              />
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <div 
                  className="w-full h-full"
                  style={{
                    background: selectedPost.image
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                  <span className="text-gray-400 text-sm">{selectedPost.date}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedPost.excerpt || "This is a detailed article about " + selectedPost.title + ". The content would typically include comprehensive information, insights, and analysis related to the topic."}
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BlogPage;