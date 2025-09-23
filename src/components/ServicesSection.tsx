import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Bot, Mail, TrendingUp, Code, MessageCircle, Check, X } from "lucide-react";

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [typingText, setTypingText] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  
  const fullTypingText = "Generate a list...";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const htmlElement = entry.target as HTMLElement;
            const cardIndex = parseInt(htmlElement.dataset.cardIndex || '0');
            setVisibleCards(prev => new Set(prev).add(cardIndex));
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visibleCards.has(1)) { // AI Assistant card
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullTypingText.length) {
          setTypingText(fullTypingText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [visibleCards]);

  useEffect(() => {
    if (visibleCards.has(0)) { // Workflow automation card
      const interval = setInterval(() => {
        setScrollPosition(prev => (prev + 1) % 400);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [visibleCards]);

  const services = [
    {
      category: "Workflow Automation",
      title: "Automate repetitive tasks", 
      description: "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.",
      badges: ["Internal Task Bots", "100+ Automations"],
      icon: Clock,
      size: "large",
      type: "workflow"
    },
    {
      category: "AI Assistant",
      title: "Delegate Daily Tasks",
      description: "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.",
      badges: ["Summaries", "Scheduling", "Many more"],
      icon: Bot,
      size: "large",
      type: "assistant"
    },
    {
      category: "Sales & Marketing", 
      title: "Accelerate Sales Growth",
      description: "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.",
      badges: ["Leads", "Content", "Social post"],
      icon: TrendingUp,
      size: "large",
      type: "sales"
    },
    {
      category: "Custom Projects",
      title: "Build Smarter Systems",
      description: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.",
      badges: ["Strategy", "Custom AI", "Consulting"],
      icon: Code,
      size: "large",
      type: "custom"
    }
  ];

  const workflowTasks = [
    { name: "Payroll management", status: "pending", date: "Due on 2nd july" },
    { name: "Employee Tracking", status: "completed", date: "2 days ago" },
    { name: "Social media post", status: "cancelled", date: "Cancelled by user" },
    { name: "Lead list", status: "progress", date: "70% prepared" },
    { name: "Invoice processing", status: "pending", date: "Due on 5th july" },
    { name: "Data backup", status: "completed", date: "1 hour ago" },
    { name: "Report generation", status: "progress", date: "45% completed" },
    { name: "Email campaign", status: "pending", date: "Scheduled for tomorrow" }
  ];

  const emailContacts = [
    { name: "Jack Daniel", role: "Founder", email: "justin@main.com", company: "Xavier LLC", verified: true },
    { name: "Ganga Chappal", role: "CEO", email: "ganga@company.com", company: "Tech Corp", verified: false }
  ];

  return (
    <section ref={sectionRef} className="relative bg-black py-12 sm:py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgb(0, 0, 0) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0, 0, 0) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr justify-items-center w-full max-w-6xl">
          {services.map((service, index) => (
            <div 
              key={index}
              data-card-index={index}
              className={`
                ${service.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'}
                ${service.type === 'assistant' ? 'lg:col-start-2 lg:col-span-2' : ''}
                bg-black/30
                backdrop-blur-sm border border-white/10 rounded-2xl p-8
                hover:bg-black/40 transition-all duration-500
                flex flex-col justify-between
                transform transition-all duration-700 ease-out
                ${visibleCards.has(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
                }
                w-full max-w-lg
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Category */}
              {service.category && (
                <div className="mb-4">
                  <span className="text-gray-400 text-sm font-medium">
                    {service.category}
                  </span>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {service.type === 'workflow' ? (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-80">
                    {/* Container 1 - Animated Task List */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col justify-center overflow-hidden"
                    >
                      <div className="w-full h-full">
                        <div className="flex justify-between text-sm text-gray-400 mb-4">
                          <span>All Tasks</span>
                          <span>Waiting for approval</span>
                        </div>
                        
                        <div 
                          className="space-y-3 transition-transform duration-300 ease-linear will-change-transform"
                          style={{
                            transform: `translateY(-${scrollPosition}px)`
                          }}
                        >
                          {[...workflowTasks, ...workflowTasks].map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                              <div className="flex-shrink-0">
                                {task.status === 'completed' && <Check className="w-4 h-4 text-green-400" />}
                                {task.status === 'cancelled' && <X className="w-4 h-4 text-red-400" />}
                                {task.status === 'pending' && <Clock className="w-4 h-4 text-yellow-400" />}
                                {task.status === 'progress' && <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white text-sm font-medium">{task.name}</div>
                                <div className="text-gray-400 text-xs">{task.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Fade effect at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
                      </div>
                    </div>
                    
                    {/* Container 2 - Title and Description */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col justify-center"
                    >
                      <div className="w-full h-full flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                          We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : service.type === 'assistant' ? (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-80">
                    {/* Container 1 - Content */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col justify-center"
                    >
                      <div className="w-full h-full flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                          Get instant support with our AI assistant that understands your business needs and provides intelligent responses 24/7.
                        </p>
                      </div>
                    </div>
                    
                    {/* Container 2 - Chat Interface */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col"
                    >
                      <div className="w-full h-full">
                        {/* Chat Header */}
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-700/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                          What can I help with?
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                          Whether you need help in customer handling or make changes in your system just give me command
                        </p>
                        
                        {/* Chat Input */}
                        <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-300 mb-4">
                          <div className="flex items-center space-x-2">
                            <span>{typingText}</span>
                            {visibleCards.has(index) && (
                              <div className="w-2 h-4 bg-purple-500 animate-pulse"></div>
                            )}
                          </div>
                        </div>
                        
                        {/* Additional UI elements */}
                        <div className="space-y-2 text-xs text-gray-500 mt-auto">
                          <div className="flex items-center space-x-2">
                            <span>📄</span>
                            <span>Add document</span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <span>📊 Analyze</span>
                            <span>🖼️ Generate image</span>
                            <span>🔍 research</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : service.type === 'sales' ? (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-80">
                    {/* Container 1 - Content */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col justify-center"
                    >
                      <div className="w-full h-full flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                          Boost your sales with automated outreach campaigns that find qualified leads and nurture them into paying customers.
                        </p>
                      </div>
                    </div>
                    
                    {/* Container 2 - Email Sending Interface */}
                    <div 
                      className="w-full lg:w-96 h-64 lg:h-80 bg-black/80 rounded-2xl p-4 lg:p-8 flex flex-col"
                    >
                      <div className="w-full h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            E-mail Sending
                          </h3>
                          <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-blue-600 text-white border-0">LinkedIn</Badge>
                          <Badge className="bg-gray-700 text-white border-0">IT services</Badge>
                          <Badge className="bg-gray-700 text-white border-0">Founders</Badge>
                        </div>
                        
                        <div className="space-y-3 flex-1 overflow-y-auto">
                          {emailContacts.map((contact, contactIndex) => (
                            <div key={contactIndex} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">
                                  {contact.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-white font-medium">{contact.name}</span>
                                  {contact.verified && (
                                    <Badge className="bg-green-500/20 border-green-500/40 text-green-400 text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400">{contact.role}</div>
                                <div className="text-xs text-gray-500">{contact.email}</div>
                                <div className="text-xs text-gray-500">{contact.company}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                      {service.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Badges */}
              {service.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                  {service.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="outline"
                      className="bg-white/5 border-white/10 text-white px-2 sm:px-3 py-1 text-xs font-medium backdrop-blur-sm"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;