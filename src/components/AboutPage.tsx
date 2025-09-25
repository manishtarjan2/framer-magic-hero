import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Footer from './Footer';

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-96 h-96 bg-orbit-purple/10 rounded-full blur-3xl -top-20 -right-20 animate-pulse" />
      <div className="absolute w-64 h-64 bg-orbit-purple/5 rounded-full blur-2xl top-1/2 -left-20 animate-pulse delay-700" />
      <div className="absolute w-48 h-48 bg-orbit-purple/8 rounded-full blur-xl bottom-20 right-1/3 animate-pulse delay-1000" />
    </div>
  );
};

// Statistics Component
const Statistics = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    years: 0
  });

  const targets = {
    clients: 150,
    projects: 500,
    satisfaction: 99,
    years: 5
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        clients: Math.round(targets.clients * progress),
        projects: Math.round(targets.projects * progress),
        satisfaction: Math.round(targets.satisfaction * progress),
        years: Math.round(targets.years * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      number: `${counts.clients}+`,
      label: "Happy Clients",
      description: "Businesses transformed"
    },
    {
      number: `${counts.projects}+`,
      label: "Projects Completed",
      description: "Successful automations"
    },
    {
      number: `${counts.satisfaction}%`,
      label: "Client Satisfaction",
      description: "Rating from our clients"
    },
    {
      number: `${counts.years}+`,
      label: "Years Experience",
      description: "In AI automation"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-orbit-text-primary mb-2">
            {stat.number}
          </div>
          <div className="text-orbit-purple font-semibold mb-1">
            {stat.label}
          </div>
          <div className="text-orbit-text-muted text-sm">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, description, image, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="bg-orbit-card border border-orbit-purple/20 rounded-xl p-6 hover:border-orbit-purple/40 transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${image} flex-shrink-0`} />
          <div className="flex-1">
            <h3 className="text-orbit-text-primary font-semibold text-lg group-hover:text-orbit-purple transition-colors duration-300">
              {name}
            </h3>
            <p className="text-orbit-purple text-sm font-medium mb-2">
              {role}
            </p>
            <p className="text-orbit-text-muted text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Values Component
const Values = () => {
  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "We stay at the forefront of AI technology to bring cutting-edge solutions to your business."
    },
    {
      icon: "🤝",
      title: "Client-Centric",
      description: "Your success is our success. We build long-term partnerships based on trust and results."
    },
    {
      icon: "⚡",
      title: "Efficiency Focus",
      description: "We streamline processes to save you time and resources while maximizing productivity."
    },
    {
      icon: "🔒",
      title: "Security Priority",
      description: "Data security and privacy are paramount in everything we build and deploy."
    },
    {
      icon: "📈",
      title: "Scalable Solutions",
      description: "Our solutions grow with your business, ensuring long-term value and adaptability."
    },
    {
      icon: "🎨",
      title: "Quality Excellence",
      description: "We deliver high-quality solutions that exceed expectations and drive real results."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {values.map((value, index) => (
        <div key={index} className="bg-orbit-card border border-orbit-purple/20 rounded-xl p-6 hover:border-orbit-purple/40 transition-all duration-300 group">
          <div className="text-3xl mb-4">{value.icon}</div>
          <h3 className="text-orbit-text-primary font-semibold text-lg mb-2 group-hover:text-orbit-purple transition-colors duration-300">
            {value.title}
          </h3>
          <p className="text-orbit-text-muted text-sm leading-relaxed">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-orbit-dark text-orbit-text-primary relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block bg-orbit-card border border-orbit-purple/20 text-orbit-text-muted px-4 py-2 rounded-full text-sm mb-6">
              About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transforming Businesses with
              <span className="block text-orbit-purple">AI Automation</span>
            </h1>
            <p className="text-orbit-text-muted text-lg max-w-3xl mx-auto leading-relaxed">
              At OrbIT Labs, we're passionate about helping businesses unlock their full potential through intelligent automation. 
              Our team of AI specialists and automation experts work tirelessly to create solutions that drive efficiency, 
              reduce costs, and accelerate growth.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="bg-orbit-card border border-orbit-purple/20 rounded-2xl p-8 md:p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-orbit-text-muted">
                These numbers represent real businesses we've helped transform
              </p>
            </div>
            <Statistics />
          </div>

          {/* Our Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-orbit-text-muted leading-relaxed">
                <p>
                  Founded in 2019, OrbIT Labs emerged from a simple observation: businesses were spending countless hours on repetitive tasks that could be automated with the right technology.
                </p>
                <p>
                  What started as a small team of AI enthusiasts has grown into a full-service automation company, serving clients across industries from startups to Fortune 500 companies.
                </p>
                <p>
                  Our mission remains unchanged: to democratize AI technology and make intelligent automation accessible to businesses of all sizes.
                </p>
              </div>
              <Button variant="orbit" className="mt-6">
                Learn More About Our Services
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-orbit-purple/20 to-orbit-purple/5 rounded-2xl flex items-center justify-center">
                <div className="text-6xl opacity-50">🚀</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orbit-purple/10 to-transparent rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-orbit-text-muted max-w-2xl mx-auto">
                These core principles guide every decision we make and every solution we create
              </p>
            </div>
            <Values />
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-orbit-text-muted max-w-2xl mx-auto">
                A diverse group of AI specialists, developers, and automation experts dedicated to your success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TeamMember
                name="Alex Chen"
                role="CEO & AI Strategist"
                description="10+ years in AI research and business automation. Leads our vision for intelligent workflow solutions."
                image="from-blue-500 to-purple-600"
                delay={0}
              />
              <TeamMember
                name="Sarah Rodriguez"
                role="Head of Engineering"
                description="Expert in machine learning and system architecture. Ensures our solutions are robust and scalable."
                image="from-purple-500 to-pink-500"
                delay={200}
              />
              <TeamMember
                name="Michael Zhang"
                role="Automation Specialist"
                description="Specializes in workflow optimization and process automation. Turns complex challenges into simple solutions."
                image="from-green-500 to-teal-500"
                delay={400}
              />
              <TeamMember
                name="Emma Johnson"
                role="UX/UI Designer"
                description="Creates intuitive interfaces for our AI tools. Believes technology should be beautiful and accessible."
                image="from-orange-500 to-red-500"
                delay={600}
              />
              <TeamMember
                name="David Kim"
                role="Data Scientist"
                description="PhD in Machine Learning. Develops the AI models that power our automation solutions."
                image="from-cyan-500 to-blue-500"
                delay={800}
              />
              <TeamMember
                name="Lisa Wang"
                role="Customer Success Manager"
                description="Ensures every client achieves their automation goals. Your success is her priority."
                image="from-pink-500 to-rose-500"
                delay={1000}
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-orbit-purple/10 to-orbit-purple/5 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-orbit-text-muted text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have already transformed their operations with our AI automation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="orbit" className="px-8 py-3">
                Schedule a Consultation
              </Button>
              <Button variant="outline" className="px-8 py-3 border-orbit-purple text-orbit-purple hover:bg-orbit-purple hover:text-white">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;