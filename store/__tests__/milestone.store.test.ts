import * as MilestoneStore from "../milestones.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("MilestoneStore", () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem(MilestoneStore.STORAGE_KEY);
  });

  it("should create a new milestone", async () => {
    const milestoneData = {
      date: "2024-01-28",
      title: "First Smile",
      description: "Such a cute moment!",
    };

    const newMilestone = await MilestoneStore.createMilestone(milestoneData);

    expect(newMilestone).toHaveProperty("id");
    expect(newMilestone.date).toBe(milestoneData.date);
    expect(newMilestone.title).toBe(milestoneData.title);
    expect(newMilestone.description).toBe(milestoneData.description);
  });

  it("should get all milestones", async () => {
    const milestones = await MilestoneStore.getMilestones();

    expect(Array.isArray(milestones)).toBe(true);
  });

  it("should update a milestone", async () => {
    const milestoneData = {
      date: "2024-01-30",
      title: "First Step",
      description: "Amazing progress!",
    };

    const newMilestone = await MilestoneStore.createMilestone(milestoneData);

    const updatedData = {
      ...newMilestone,
      description: "Updated description",
    };

    await MilestoneStore.updateMilestone(updatedData);

    const milestones = await MilestoneStore.getMilestones();

    expect(milestones).toHaveLength(1);
    expect(milestones[0].description).toBe("Updated description");
  });

  it("should delete a milestone", async () => {
    const milestones = await MilestoneStore.getMilestones();
    const initialLength = milestones.length;

    const milestoneData = {
      date: "2024-02-02",
      title: "First Words",
      description: "Baby said their first words!",
    };

    const newMilestone = await MilestoneStore.createMilestone(milestoneData);
    await MilestoneStore.deleteMilestone(newMilestone.id);

    const updatedMilestones = await MilestoneStore.getMilestones();

    expect(updatedMilestones).toHaveLength(initialLength);
  });
});
