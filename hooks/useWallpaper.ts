import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type WallpaperChoice = 'auto' | 'beach' | 'nature' | 'sky' | 'custom';

interface WallpaperContextType {
  wallpaper: WallpaperChoice;
  setWallpaper: (wallpaper: WallpaperChoice) => void;
  customWallpaper: string;
  setCustomWallpaper: (image: string) => void;
  activeWallpaper: 'beach' | 'nature' | 'sky' | 'custom';
}

export const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
};

export const useWallpaperProvider = () => {
  const [wallpaper, setWallpaper] = useLocalStorage<WallpaperChoice>('wallpaper', 'auto');
  const [customWallpaper, setCustomWallpaper] = useLocalStorage<string>('customWallpaper', '');
  
  const getActiveWallpaper = (): 'beach' | 'nature' | 'sky' | 'custom' => {
    if (wallpaper === 'custom') {
        return 'custom';
    }
    if (wallpaper !== 'auto') {
      return wallpaper;
    }
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'beach'; // Morning
    if (hour >= 12 && hour < 18) return 'nature'; // Afternoon
    return 'sky'; // Evening/Night
  };

  const activeWallpaper = getActiveWallpaper();

  const value = useMemo(() => ({
    wallpaper,
    setWallpaper,
    customWallpaper,
    setCustomWallpaper,
    activeWallpaper,
  }), [wallpaper, setWallpaper, customWallpaper, setCustomWallpaper, activeWallpaper]);

  return value;
}