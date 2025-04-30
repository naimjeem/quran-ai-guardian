
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { quranVerses } from '@/data/quranVerses';

interface VerseSelectorProps {
  selectedVerseId: string;
  onVerseSelect: (verseId: string) => void;
}

const VerseSelector: React.FC<VerseSelectorProps> = ({ selectedVerseId, onVerseSelect }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="verse-select" className="text-lg font-medium">Select a Verse to Practice</Label>
      <Select value={selectedVerseId} onValueChange={onVerseSelect}>
        <SelectTrigger id="verse-select" className="w-full">
          <SelectValue placeholder="Select a verse" />
        </SelectTrigger>
        <SelectContent>
          {quranVerses.map((verse) => (
            <SelectItem key={verse.id} value={verse.id}>
              {verse.surahName}: Verse {verse.verseNumber}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VerseSelector;
