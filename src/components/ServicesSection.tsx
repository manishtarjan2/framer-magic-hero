import { Badge } from "@/components/ui/badge";
import { Clock, Bot, Mail, TrendingUp, Code, MessageCircle } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      category: "Workflow Automation",
      title: "Automate repetitive tasks", 
      description: "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.",
      badges: ["Internal Task Bots", "100+ Automations"],
      icon: Clock,
      size: "large"
    },
    {
      category: "AI Assistant",
      title: "Delegate Daily Tasks",
      description: "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.",
      badges: ["Summaries", "Scheduling", "Many more"],
      icon: Bot,
      size: "small"
    },
    {
      category: "",
      title: "What can I help with?",
      description: "Whether you need help scheduling meetings or need changes to presentations and dashboards, I can help.",
      badges: [],
      icon: MessageCircle,
      size: "small",
      isChat: true
    },
    {
      category: "",
      title: "Email Sending",
      description: "LinkedIn • IT services • Founders",
      badges: [],
      icon: Mail,
      size: "small",
      isEmail: true
    },
    {
      category: "Sales & Marketing", 
      title: "Accelerate Sales Growth",
      description: "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.",
      badges: ["Leads", "Content", "Social post"],
      icon: TrendingUp,
      size: "large"
    },
    {
      category: "Custom Projects",
      title: "Build Smarter Systems",
      description: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.",
      badges: ["Strategy", "Custom AI", "Consulting"],
      icon: Code,
      size: "large"
    }
  ];

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                ${service.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'}
                ${service.isChat ? 'bg-orbit-dark-lighter/30' : 'bg-orbit-dark-lighter/50'}
                backdrop-blur-sm border border-orbit-text-muted/10 rounded-2xl p-8
                hover:bg-orbit-dark-lighter/70 transition-all duration-300
                flex flex-col justify-between
              `}
            >
              {/* Category */}
              {service.category && (
                <div className="mb-4">
                  <span className="text-orbit-text-muted text-sm font-medium">
                    {service.category}
                  </span>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {service.isChat ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-orbit-text-primary mb-4">
                      {service.title}
                    </h3>
                    <p className="text-orbit-text-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="bg-orbit-dark-lighter/50 rounded-lg p-3 text-sm text-orbit-text-muted border border-orbit-text-muted/10">
                      Generate a list...
                    </div>
                  </div>
                ) : service.isEmail ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-orbit-text-primary">
                        {service.title}
                      </h3>
                      <service.icon className="w-5 h-5 text-orbit-text-muted" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orbit-text-muted/20 flex items-center justify-center">
                          <span className="text-xs text-orbit-text-primary font-medium">MT</span>
                        </div>
                        <div>
                          <div className="text-sm text-orbit-text-primary font-medium">Mike Tyler</div>
                          <div className="text-xs text-orbit-text-muted">Founder</div>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/20 text-green-400">
                            Verified
                          </Badge>
                        </div>
                      </div>
                      <p className="text-orbit-text-muted text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-orbit-text-primary mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-orbit-text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Badges */}
              {service.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex}
                      variant="outline"
                      className="bg-orbit-dark-lighter/50 border-orbit-text-muted/20 text-orbit-text-primary px-3 py-1 text-xs font-medium backdrop-blur-sm"
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