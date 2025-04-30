
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { quranVerses } from '@/data/quranVerses';

interface VerseDisplayProps {
  verseId: string;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ verseId }) => {
  const verse = quranVerses.find(v => v.id === verseId);
  
  if (!verse) return null;
  
  return (
    <Card className="overflow-hidden border-tarteel-gold/30 shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-tarteel-primary">
              {verse.surahName} <span className="text-tarteel-gold">({verse.surahNumber})</span>
            </h3>
            <span className="text-sm bg-tarteel-primary text-white px-2 py-1 rounded-full">
              Verse {verse.verseNumber}
            </span>
          </div>
          
          <p className="arabic-text text-3xl leading-loose text-right py-4">
            {verse.arabicText}
          </p>
          
          <div className="text-muted-foreground text-sm">
            <p>{verse.englishTranslation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerseDisplay;
