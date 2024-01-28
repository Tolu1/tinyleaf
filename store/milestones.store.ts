import AsyncStorage from "@react-native-async-storage/async-storage";

const MILESTONE_STORAGE_KEY = "milestones";

export const STORAGE_KEY = MILESTONE_STORAGE_KEY;

export type MilestoneProps = {
  id: string;
  date: string;
  title: string;
  description?: string;
};

export const createMilestone = async (
  milestoneData: Omit<MilestoneProps, "id">
): Promise<MilestoneProps> => {
  try {
    const existingMilestones = await AsyncStorage.getItem(
      MILESTONE_STORAGE_KEY
    );
    let milestones: MilestoneProps[] = existingMilestones
      ? JSON.parse(existingMilestones)
      : [];

    const newMilestone: MilestoneProps = {
      ...milestoneData,
      id: Date.now().toString(),
    };

    milestones = [...milestones, newMilestone];

    await AsyncStorage.setItem(
      MILESTONE_STORAGE_KEY,
      JSON.stringify(milestones)
    );
    return newMilestone;
  } catch (error) {
    console.error("Error creating milestone:", error);
    throw error;
  }
};

export const getMilestones = async (): Promise<MilestoneProps[]> => {
  try {
    const milestones = await AsyncStorage.getItem(MILESTONE_STORAGE_KEY);
    return milestones ? JSON.parse(milestones) : [];
  } catch (error) {
    console.error("Error getting milestones:", error);
    throw error;
  }
};

export const updateMilestone = async (
  updatedMilestone: MilestoneProps
): Promise<void> => {
  try {
    const existingMilestones = await AsyncStorage.getItem(
      MILESTONE_STORAGE_KEY
    );
    let milestones: MilestoneProps[] = existingMilestones
      ? JSON.parse(existingMilestones)
      : [];

    const updatedMilestones = milestones.map((milestone) =>
      milestone.id === updatedMilestone.id ? updatedMilestone : milestone
    );

    await AsyncStorage.setItem(
      MILESTONE_STORAGE_KEY,
      JSON.stringify(updatedMilestones)
    );
  } catch (error) {
    console.error("Error updating milestone:", error);
    throw error;
  }
};

export const deleteMilestone = async (id: string): Promise<void> => {
  try {
    const existingMilestones = await AsyncStorage.getItem(
      MILESTONE_STORAGE_KEY
    );
    let milestones: MilestoneProps[] = existingMilestones
      ? JSON.parse(existingMilestones)
      : [];

    milestones = milestones.filter((milestone) => milestone.id !== id);

    await AsyncStorage.setItem(
      MILESTONE_STORAGE_KEY,
      JSON.stringify(milestones)
    );
  } catch (error) {
    console.error("Error deleting milestone:", error);
    throw error;
  }
};
