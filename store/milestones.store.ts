import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MilestoneProps = {
  id: string;
  date: string;
  title: string;
  description?: string;
};

type MilestoneStore = {
  milestones: MilestoneProps[];
  createMilestone: (milestoneData: Omit<MilestoneProps, "id">) => void;
  getMilestones: () => MilestoneProps[];
  updateMilestone: (updatedMilestone: MilestoneProps) => void;
  deleteMilestone: (id: string) => void;
};

export const useMilestoneStore = create(
  persist<MilestoneStore>(
    (set, get) => ({
      milestones: [],
      createMilestone: (milestoneData) => {
        const newMilestone: MilestoneProps = {
          ...milestoneData,
          id: Date.now().toString(),
        };
        set((state) => ({
          milestones: [...state.milestones, newMilestone],
        }));
      },
      getMilestones: () => get().milestones,
      updateMilestone: (updatedMilestone) => {
        set((state) => ({
          milestones: state.milestones.map((milestone) =>
            milestone.id === updatedMilestone.id ? updatedMilestone : milestone
          ),
        }));
      },
      deleteMilestone: (id) => {
        set((state) => ({
          milestones: state.milestones.filter(
            (milestone) => milestone.id !== id
          ),
        }));
      },
    }),
    {
      name: "milestones-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
