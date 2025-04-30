
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { quranVerses } from '@/data/quranVerses';

interface VerseDisplayProps {
  verseId: string;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verseId }) => {
  const verse = quranVerses.find(v => v.id === verseId);
  
  if (!verse) {
    return (
      <Card className="bg-red-50 border-red-300">
        <CardContent className="p-6">
          <div className="text-red-500">Verse not found</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-tarteel-gold/30">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-tarteel-primary">
            {verse.surahName}, Verse {verse.verseNumber}
          </h2>
        </div>
        
        <div className="arabic-text text-4xl text-right leading-loose p-4 bg-tarteel-cream/30 rounded-lg" dir="rtl">
          {verse.arabicText}
        </div>
        
        <div className="text-md text-tarteel-dark p-4 bg-tarteel-cream/20 rounded-lg">
          {verse.translation}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerseDisplay;
