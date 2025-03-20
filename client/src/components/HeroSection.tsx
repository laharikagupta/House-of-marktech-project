import { useState } from "react";
import { useInView } from "react-intersection-observer";
import WaitlistForm from "./WaitlistForm";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowUp } from "lucide-react";

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white -z-10"></div>
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] opacity-5 -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`max-w-lg transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <Badge variant="outline" className="bg-primary/10 text-primary-700 hover:bg-primary/20 mb-6 px-3 py-1 text-sm">
              Coming Soon
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Revolutionize Your Workflow
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              LaunchPad is the all-in-one platform that helps teams collaborate, create, and deliver faster than ever before.
            </p>
            
            <WaitlistForm />
          </div>
          
          <div className="hidden md:block relative">
            <div className={`w-full h-full max-w-md mx-auto relative z-10 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Dashboard preview" 
                className={`rounded-xl shadow-2xl border-8 border-white transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
              
              <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3 animate-[float_6s_ease-in-out_infinite]">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg py-2 px-4 animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">+27% Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-8 text-center">
          <div className={`transition-opacity duration-1000 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-gray-500 text-sm mb-2">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Replace with SVG logos for better performance */}
              <svg className="h-8 opacity-70 grayscale" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="40" fill="#D1D5DB" fillOpacity="0.2"/>
                <text x="80" y="20" fontFamily="Arial" fontSize="12" textAnchor="middle" dominantBaseline="middle" fill="#4B5563">Company Logo</text>
              </svg>
              <svg className="h-8 opacity-70 grayscale" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="40" fill="#D1D5DB" fillOpacity="0.2"/>
                <text x="80" y="20" fontFamily="Arial" fontSize="12" textAnchor="middle" dominantBaseline="middle" fill="#4B5563">Company Logo</text>
              </svg>
              <svg className="h-8 opacity-70 grayscale" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="40" fill="#D1D5DB" fillOpacity="0.2"/>
                <text x="80" y="20" fontFamily="Arial" fontSize="12" textAnchor="middle" dominantBaseline="middle" fill="#4B5563">Company Logo</text>
              </svg>
              <svg className="h-8 opacity-70 grayscale" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="40" fill="#D1D5DB" fillOpacity="0.2"/>
                <text x="80" y="20" fontFamily="Arial" fontSize="12" textAnchor="middle" dominantBaseline="middle" fill="#4B5563">Company Logo</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
