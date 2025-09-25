import React, { useState } from 'react';

// Animated Background Orbs
const AnimatedOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating orb */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(129, 74, 200, 0.3) 0%, rgba(129, 74, 200, 0) 70%)",
          top: "-10%",
          right: "-10%",
          animation: "float 20s ease-in-out infinite"
        }}
      />
      
      {/* Medium floating orb */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(223, 122, 254, 0.4) 0%, rgba(223, 122, 254, 0) 70%)",
          bottom: "-5%",
          left: "-5%",
          animation: "float 15s ease-in-out infinite reverse"
        }}
      />
      
      {/* Small accent orbs */}
      <div 
        className="absolute w-32 h-32 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(129, 74, 200, 0.5) 0%, rgba(129, 74, 200, 0) 70%)",
          top: "30%",
          left: "10%",
          animation: "float 12s ease-in-out infinite"
        }}
      />
    </div>
  );
};

// Contact Form Component
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using Formspree (you'll need to sign up at formspree.io and replace YOUR_FORM_ID)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Contact Form Submission: ${formData.subject}`
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="john@company.com"
          />
        </div>
      </div>

      {/* Company and Subject Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Your Company"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select a subject</option>
            <option value="AI Automation Consultation">AI Automation Consultation</option>
            <option value="Workflow Optimization">Workflow Optimization</option>
            <option value="Chatbot Development">Chatbot Development</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Partnership Opportunity">Partnership Opportunity</option>
            <option value="Support Request">Support Request</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Tell us about your project, goals, and how we can help you automate your workflows..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transform hover:scale-105'
          } text-white flex items-center gap-2`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-green-400">Message Sent Successfully!</h4>
            <p className="text-sm text-green-300">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-red-400">Failed to Send Message</h4>
            <p className="text-sm text-red-300">Please try again or contact us directly at help.orbitlabs@gmail.com</p>
          </div>
        </div>
      )}
    </form>
  );
};

// Contact Info Cards
const ContactInfo: React.FC = () => {
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      description: "Get in touch with our team",
      contact: "help.orbitlabs@gmail.com",
      link: "mailto:help.orbitlabs@gmail.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Response Time",
      description: "We typically respond within",
      contact: "24 hours",
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      description: "Serving clients globally",
      contact: "Remote-First",
      link: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {contactMethods.map((method, index) => (
        <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
              {method.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{method.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{method.description}</p>
              {method.link ? (
                <a 
                  href={method.link}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
                >
                  {method.contact}
                </a>
              ) : (
                <span className="text-purple-400 font-medium">{method.contact}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Contact Page Component
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedOrbs />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gray-900/50 text-gray-300 px-4 py-2 rounded-full text-sm mb-6">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Let's discuss how AI automation can streamline your business processes, 
              boost efficiency, and drive growth. Our team is ready to help you get started.
            </p>
          </div>

          {/* Contact Info Cards */}
          <ContactInfo />

          {/* Contact Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  All fields marked with an asterisk (*) are required.
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  question: "What types of businesses do you work with?",
                  answer: "We work with businesses of all sizes, from startups to enterprises, across various industries including e-commerce, healthcare, finance, and more."
                },
                {
                  question: "How long does a typical automation project take?",
                  answer: "Project timelines vary based on complexity, but most automation solutions are delivered within 2-6 weeks from project initiation."
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, we offer comprehensive support and maintenance packages to ensure your automation solutions continue to perform optimally."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <summary className="p-6 cursor-pointer font-medium text-white hover:text-purple-400 transition-colors duration-200">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;