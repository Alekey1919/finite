import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  autoDetectColorPreference,
  ColorThemesEnum,
} from "@/app/utils/autoDetectColorPreference";

interface ThemeState {
  theme: ColorThemesEnum;
  setDarkMode: () => void;
  setLightMode: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: autoDetectColorPreference(), // Initialize the state
      setDarkMode: () => set({ theme: ColorThemesEnum.Dark }),
      setLightMode: () => set({ theme: ColorThemesEnum.Light }),
    }),
    {
      name: "theme-storage", // Key in localStorage
      partialize: (state) => ({ theme: state.theme }), // Save only the 'theme' property
    }
  )
);

export default useThemeStore;
