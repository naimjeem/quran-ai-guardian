
import React from 'react';
import { Heart } from 'lucide-react';

const TarteelFooter: React.FC = () => {
  return (
    <footer className="bg-tarteel-primary/10 py-4 px-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-tarteel-primary">
        <div className="flex items-center mb-2 md:mb-0">
          <span>Tarteel AI Guardian</span>
          <span className="mx-2">•</span>
          <span>Improve Your Quran Recitation</span>
        </div>
        
        <div className="flex items-center">
          Made with <Heart className="h-4 w-4 mx-1 text-tarteel-primary fill-current" /> for the Quran
        </div>
      </div>
    </footer>
  );
};

export default TarteelFooter;
