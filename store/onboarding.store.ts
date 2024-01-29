import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OnboardingStore = {
  onboarded: boolean;
  setOnboarded: (value: boolean) => void;
};

export const useOnboardingStore = create(
  persist<OnboardingStore>(
    (set) => ({
      onboarded: false,
      setOnboarded: (value: boolean) => set({ onboarded: value }),
    }),
    {
      name: "onboarding-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
