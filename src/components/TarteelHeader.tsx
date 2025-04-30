
import React from 'react';
import { BookOpen } from 'lucide-react';

const TarteelHeader: React.FC = () => {
  return (
    <header className="bg-tarteel-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-tarteel-gold" />
          <h1 className="text-2xl font-bold">
            Tarteel <span className="text-tarteel-gold">AI</span>
          </h1>
        </div>
        <div className="text-sm opacity-80">
          Improve Your Quran Recitation
        </div>
      </div>
    </header>
  );
};

export default TarteelHeader;
