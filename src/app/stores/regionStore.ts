"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegionStore {
  region: "us" | "ar";
  setRegion: (date: "us" | "ar") => void;
}

const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      region: "us",
      setRegion: (date: "us" | "ar") => set({ region: date }),
    }),
    {
      name: "region-storage", // Key in localStorage
    }
  )
);

export default useRegionStore;
