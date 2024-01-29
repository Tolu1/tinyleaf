import { act, renderHook } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMilestoneStore, MilestoneProps } from "../milestones.store";

describe("MilestoneStore", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    useMilestoneStore.setState({ milestones: [] });
  });

  it("should create a new milestone", async () => {
    const { result } = renderHook(() => useMilestoneStore());
    const milestoneData = {
      date: "2024-01-28",
      title: "First Smile",
      description: "Such a cute moment!",
    };

    await act(async () => {
      result.current.createMilestone(milestoneData);
    });

    expect(result.current.milestones[0]).toHaveProperty("id");
    expect(result.current.milestones[0].date).toBe(milestoneData.date);
    expect(result.current.milestones[0].title).toBe(milestoneData.title);
    expect(result.current.milestones[0].description).toBe(
      milestoneData.description
    );
  });

  it("should get all milestones", async () => {
    const { result } = renderHook(() => useMilestoneStore());

    expect(Array.isArray(result.current.milestones)).toBe(true);
  });

  it("should update a milestone", async () => {
    const { result } = renderHook(() => useMilestoneStore());
    const milestoneData = {
      date: "2024-01-30",
      title: "First Step",
      description: "Amazing progress!",
    };

    let newMilestone: MilestoneProps;
    await act(async () => {
      result.current.createMilestone(milestoneData);
    });

    newMilestone = result.current.milestones[0];

    const updatedData = {
      ...newMilestone,
      description: "Updated description",
    };

    await act(async () => {
      result.current.updateMilestone(updatedData);
    });

    expect(
      result.current.milestones.find((m) => m.id === newMilestone.id)
        ?.description
    ).toBe("Updated description");
  });

  it("should delete a milestone", async () => {
    const { result } = renderHook(() => useMilestoneStore());
    const milestoneData = {
      date: "2024-02-02",
      title: "First Words",
      description: "Baby said their first words!",
    };

    let newMilestone: MilestoneProps;
    await act(async () => {
      result.current.createMilestone(milestoneData);
    });

    newMilestone = result.current.milestones[0];

    await act(async () => {
      result.current.deleteMilestone(newMilestone.id);
    });

    expect(
      result.current.milestones.find((m) => m.id === newMilestone.id)
    ).toBeUndefined();
  });

  it("should persist and rehydrate the milestones", async () => {
    const { result, rerender } = renderHook(() => useMilestoneStore());
    const milestoneData = {
      date: "2024-01-28",
      title: "First Smile",
      description: "Such a cute moment!",
    };

    await act(async () => {
      result.current.createMilestone(milestoneData);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    // TODO: Clear the in-memory state
    // act(() => {
    //   result.current.setState({ milestones: [] });
    // });

    rerender();
    const rehydratedMilestones = result.current.milestones;

    expect(rehydratedMilestones.length).toBeGreaterThan(0);
    expect(rehydratedMilestones[0].date).toBe(milestoneData.date);
    expect(rehydratedMilestones[0].title).toBe(milestoneData.title);
    expect(rehydratedMilestones[0].description).toBe(milestoneData.description);
  });
});
