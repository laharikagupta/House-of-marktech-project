import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707a1 1 0 11-1.414 1.414L11.293 3.707A1 1 0 0112 3zm2 5a1 1 0 01.707.293l.707.707a1 1 0 01-1.414 1.414l-.707-.707A1 1 0 0114 8zm2.293 9.293a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold text-primary">LaunchPad</span>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <button 
            onClick={() => handleLinkClick('features')} 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => handleLinkClick('pricing')} 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => handleLinkClick('faq')} 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleLinkClick('contact')} 
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>
        
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-16">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  handleLinkClick('features');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium py-2 text-left hover:text-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  handleLinkClick('pricing');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium py-2 text-left hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  handleLinkClick('faq');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium py-2 text-left hover:text-primary transition-colors"
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  handleLinkClick('contact');
                  setIsMenuOpen(false);
                }}
                className="text-lg font-medium py-2 text-left hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
