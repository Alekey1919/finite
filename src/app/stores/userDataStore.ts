import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  birthDate: number | null;
  setBirthDate: (date: number) => void;
  clearUserData: () => void;
}

const useUserDataStore = create<UserState>()(
  persist(
    (set) => ({
      birthDate: null,
      setBirthDate: (date) => set({ birthDate: date }),
      clearUserData: () => set({ birthDate: null }),
    }),
    {
      name: "user-data-storage", // Key in localStorage
    }
  )
);

export default useUserDataStore;
