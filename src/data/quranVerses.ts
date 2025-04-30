
export interface QuranVerse {
  id: string;
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  arabicText: string;
  englishTranslation: string;
  transliteration: string;
  audioUrl?: string;
}

export const quranVerses: QuranVerse[] = [
  {
    id: "1-1",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    verseNumber: 1,
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    englishTranslation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahi r-rahmani r-raheem"
  },
  {
    id: "1-2",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    verseNumber: 2,
    arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    englishTranslation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil 'alamin"
  },
  {
    id: "1-3",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    verseNumber: 3,
    arabicText: "الرَّحْمَنِ الرَّحِيمِ",
    englishTranslation: "The Entirely Merciful, the Especially Merciful,",
    transliteration: "Ar-rahmani r-raheem"
  },
  {
    id: "1-4",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    verseNumber: 4,
    arabicText: "مَالِكِ يَوْمِ الدِّينِ",
    englishTranslation: "Sovereign of the Day of Recompense.",
    transliteration: "Maliki yawmid-deen"
  },
  {
    id: "1-5",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    verseNumber: 5,
    arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    englishTranslation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een"
  },
  {
    id: "112-1",
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    verseNumber: 1,
    arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    englishTranslation: "Say, \"He is Allah, [who is] One,\"",
    transliteration: "Qul huwa Allahu ahad"
  },
  {
    id: "112-2",
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    verseNumber: 2,
    arabicText: "اللَّهُ الصَّمَدُ",
    englishTranslation: "Allah, the Eternal Refuge.",
    transliteration: "Allahu s-samad"
  },
  {
    id: "112-3",
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    verseNumber: 3,
    arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    englishTranslation: "He neither begets nor is born,",
    transliteration: "Lam yalid wa lam yulad"
  },
  {
    id: "112-4",
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    verseNumber: 4,
    arabicText: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    englishTranslation: "Nor is there to Him any equivalent.",
    transliteration: "Wa lam yakun lahu kufuwan ahad"
  }
];
