
export interface QuranVerse {
  id: string;
  surahName: string;
  surahNumber: number;
  verseNumber: number;
  arabicText: string;
  transliteration: string;
  translation: string;
  recitationUrl?: string; // Added for professional Qari recitation
}

// Sample verses from the Quran with recitation URLs
export const quranVerses: QuranVerse[] = [
  {
    id: "1-1",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 1,
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    transliteration: "Bismillāhi r-raḥmāni r-raḥīm",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001001.mp3"
  },
  {
    id: "1-2",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 2,
    arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Al-ḥamdu lillāhi rabbi l-ʿālamīn",
    translation: "All praise is due to Allah, Lord of the worlds",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001002.mp3"
  },
  {
    id: "1-3",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 3,
    arabicText: "الرَّحْمَنِ الرَّحِيمِ",
    transliteration: "Ar-raḥmāni r-raḥīm",
    translation: "The Entirely Merciful, the Especially Merciful",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001003.mp3"
  },
  {
    id: "1-4",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 4,
    arabicText: "مَالِكِ يَوْمِ الدِّينِ",
    transliteration: "Māliki yawmi d-dīn",
    translation: "Sovereign of the Day of Recompense",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001004.mp3"
  },
  {
    id: "1-5",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 5,
    arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
    translation: "It is You we worship and You we ask for help",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001005.mp3"
  },
  {
    id: "1-6",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 6,
    arabicText: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdinā ṣ-ṣirāṭa l-mustaqīm",
    translation: "Guide us to the straight path",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001006.mp3"
  },
  {
    id: "1-7",
    surahName: "Al-Fatiha",
    surahNumber: 1,
    verseNumber: 7,
    arabicText: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    transliteration: "Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",
    translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/001007.mp3"
  },
  {
    id: "112-1",
    surahName: "Al-Ikhlas",
    surahNumber: 112,
    verseNumber: 1,
    arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    transliteration: "Qul huwa llāhu aḥad",
    translation: "Say, 'He is Allah, [who is] One'",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/112001.mp3"
  },
  {
    id: "112-2",
    surahName: "Al-Ikhlas",
    surahNumber: 112,
    verseNumber: 2,
    arabicText: "اللَّهُ الصَّمَدُ",
    transliteration: "Allāhu ṣ-ṣamad",
    translation: "Allah, the Eternal Refuge",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/112002.mp3"
  },
  {
    id: "112-3",
    surahName: "Al-Ikhlas",
    surahNumber: 112,
    verseNumber: 3,
    arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    transliteration: "Lam yalid wa-lam yūlad",
    translation: "He neither begets nor is born",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/112003.mp3"
  },
  {
    id: "112-4",
    surahName: "Al-Ikhlas",
    surahNumber: 112,
    verseNumber: 4,
    arabicText: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    transliteration: "Wa-lam yakun lahu kufuwan aḥad",
    translation: "Nor is there to Him any equivalent",
    recitationUrl: "https://verse.mp3quran.net/arabic/salaah_bukhatir/128/112004.mp3"
  }
];
