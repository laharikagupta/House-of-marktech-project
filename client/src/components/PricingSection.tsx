import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingTier {
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams",
    price: 9,
    features: [
      "Up to 5 users",
      "5GB storage",
      "Basic analytics",
      "Standard support"
    ],
    ctaText: "Start Free Trial"
  },
  {
    name: "Pro",
    description: "Perfect for growing teams",
    price: 29,
    popular: true,
    features: [
      "Up to 20 users",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations"
    ],
    ctaText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    description: "For organizations with complex needs",
    price: 99,
    features: [
      "Unlimited users",
      "500GB storage",
      "Real-time analytics",
      "24/7 dedicated support",
      "Advanced security features",
      "Custom development"
    ],
    ctaText: "Contact Sales"
  }
];

const PricingSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { toast } = useToast();
  
  const handlePricingClick = (tier: string) => {
    toast({
      title: `${tier} plan selected`,
      description: "We'll be in touch to complete your setup!",
    });
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Badge variant="outline" className="bg-primary/10 text-primary-700 hover:bg-primary/20 mb-4 px-3 py-1 text-sm">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-gray-600">
            Choose the plan that works best for your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`bg-white rounded-xl ${
                tier.popular 
                  ? "border-2 border-primary shadow-lg relative scale-105 z-10" 
                  : "border border-gray-100 shadow-sm"
              } overflow-hidden flex flex-col transition-all duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {tier.popular && (
                <div className="absolute top-0 inset-x-0 bg-primary text-white text-xs font-semibold py-1 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-6 border-b border-gray-100 ${tier.popular ? "pt-8" : ""}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  <span className="text-gray-500 ml-2">/ month</span>
                </div>
                <Button 
                  variant={tier.popular ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => handlePricingClick(tier.name)}
                >
                  {tier.ctaText}
                </Button>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
