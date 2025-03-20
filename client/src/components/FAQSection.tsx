import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does the 14-day free trial work?",
    answer: "Our 14-day free trial gives you full access to all features of the selected plan. You don't need to provide payment information until the trial ends, and you can cancel anytime before the trial period is over."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available. When downgrading, the changes will take effect at the start of your next billing cycle."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and regular audits to ensure your information is protected. Our platform is compliant with GDPR, HIPAA, and other relevant regulations."
  },
  {
    question: "Do you offer discounts for non-profits or educational institutions?",
    answer: "Yes, we offer special pricing for non-profit organizations, educational institutions, and open-source projects. Please contact our sales team to learn more about our discount programs."
  },
  {
    question: "How do I get support if I have questions?",
    answer: "We offer multiple support channels: email support, live chat, and a comprehensive knowledge base. Pro and Enterprise plans also include priority support with faster response times and dedicated account managers."
  }
];

const FAQSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Badge variant="outline" className="bg-primary/10 text-primary-700 hover:bg-primary/20 mb-4 px-3 py-1 text-sm">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to the most common questions about our platform.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`py-6 transition-all duration-700 ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 mt-3">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
