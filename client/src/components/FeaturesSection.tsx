import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  RefreshCcw, 
  CheckCircle
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-700 ${
        inView 
          ? "translate-y-0 opacity-100" 
          : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
    title: "Advanced Analytics",
    description: "Get deep insights into your workflow with real-time analytics and customizable dashboards."
  },
  {
    icon: <Users className="h-6 w-6 text-green-500" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team, regardless of where you are in the world."
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-500" />,
    title: "Instant Deployment",
    description: "Launch your projects in seconds with our one-click deployment system."
  },
  {
    icon: <Shield className="h-6 w-6 text-red-500" />,
    title: "Enterprise Security",
    description: "Keep your data safe with our military-grade encryption and compliance features."
  },
  {
    icon: <RefreshCcw className="h-6 w-6 text-purple-500" />,
    title: "Automated Workflows",
    description: "Save time by automating repetitive tasks with our easy-to-use workflow builder."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "API Integration",
    description: "Connect with your favorite tools and services through our extensive API library."
  }
];

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Badge variant="outline" className="bg-primary/10 text-primary-700 hover:bg-primary/20 mb-4 px-3 py-1 text-sm">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-lg text-gray-600">
            Our platform combines powerful tools with an intuitive interface to help you achieve more in less time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
