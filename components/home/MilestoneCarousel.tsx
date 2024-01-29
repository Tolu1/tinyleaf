import { View, Dimensions } from "react-native";
import React, { useEffect, useRef, useCallback } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MilestoneCard from "./MilestoneCard";

const CAROUSEL_DELAY = 5000;

export default function MilestoneCarousel() {
  const width = Dimensions.get("window").width;
  const milestones = [
    {
      title: "First Stepssss🎉",
      description: "Baby took their first steps!",
      date: "2023-01-01",
    },
    {
      title: "First Words🙈🙈🙈",
      description: "Baby said their first words!",
      date: "2023-02-01",
    },
  ];

  const carouselRef = useRef<ICarouselInstance | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      carouselRef.current?.next();
    }, CAROUSEL_DELAY);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <View onTouchStart={stopAutoPlay} onTouchEnd={startAutoPlay}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={150}
        data={milestones}
        mode="vertical-stack"
        modeConfig={{
          showLength: 2,
        }}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <MilestoneCard
            title={item.title}
            description={item.description}
            date={item.date}
          />
        )}
      />
    </View>
  );
}
