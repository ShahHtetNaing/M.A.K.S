
import { Surah, Verse } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    return data.data.map((s: any) => ({
      id: s.number,
      name: s.name,
      englishName: s.englishName,
      versesCount: s.numberOfAyahs,
      revelationType: s.revelationType
    }));
  } catch (error) {
    console.error('Failed to fetch Surah list:', error);
    return [];
  }
};

export const fetchSurahContent = async (id: number): Promise<Verse[]> => {
  try {
    const [arabicRes, transRes, translitRes] = await Promise.all([
      fetch(`${BASE_URL}/surah/${id}`),
      fetch(`${BASE_URL}/surah/${id}/en.sahih`),
      fetch(`${BASE_URL}/surah/${id}/en.transliteration`)
    ]);

    const arabicData = await arabicRes.json();
    const transData = await transRes.json();
    const translitData = await translitRes.json();

    return arabicData.data.ayahs.map((ayah: any, index: number) => ({
      number: ayah.numberInSurah,
      text: ayah.text,
      translation: transData.data.ayahs[index].text,
      transliteration: translitData.data.ayahs[index].text,
      tafsir: "Click 'Analyze' for AI-powered Tafsir and context.",
      audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
      words: [] // Populated via AI on click
    }));
  } catch (error) {
    console.error('Failed to fetch Quran data:', error);
    return [];
  }
};
