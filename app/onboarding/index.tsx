import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useTheme } from "react-native-paper";
import LottieView, { AnimationObject } from "lottie-react-native";
import { useRouter } from "expo-router";

function NextButton({ scrollTo }: { scrollTo: () => void }) {
  const buttonRef = useRef<LottieView>(null);
  const handlePress = () => {
    buttonRef.current?.play(17, 80);
    scrollTo();
  };
  return (
    <TouchableOpacity onPress={handlePress} style={{ alignItems: "center" }}>
      <LottieView
        ref={buttonRef}
        loop={false}
        speed={2}
        autoPlay
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={require("@/assets/animations/next.json")}
      />
    </TouchableOpacity>
  );
}

function Paginator({
  data,
  scrollX,
}: {
  data: OnboardingItemProps[];
  scrollX: Animated.Value;
}) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 30,
        justifyContent: "center",
      }}
    >
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 18, 8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: colors.primary,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const slides = [
  {
    id: "1",
    title: "Welcome to Tinyleaf",
    description:
      "Capture life's fleeting moments. Build your baby's memory timeline with Tinyleaf.",
    lottie: require("@/assets/animations/first.json"),
  },
  {
    id: "2",
    title: "Create Milestones",
    description:
      "Document every 'first' and celebrate milestones. Watch their journey unfold, step by step.",
    lottie: require("@/assets/animations/second.json"),
  },
  {
    id: "3",
    title: "Share with Loved Ones",
    description:
      "Bring family closer by sharing your baby's milestones. Every moment becomes a shared celebration.",
    lottie: require("@/assets/animations/third.json"),
  },
];

type OnboardingItemProps = {
  id: string;
  title: string;
  description: string;
  lottie:
    | string
    | AnimationObject
    | {
        uri: string;
      }
    | undefined;
};

function OnboardingItem({ item }: { item: OnboardingItemProps }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <LottieView
        autoPlay
        style={[
          styles.lottie,
          {
            width,
          },
        ]}
        resizeMode="contain"
        source={item.lottie}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

function Onboarding() {
  const { colors } = useTheme();
  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const router = useRouter();

  const slidesRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        <Text
          onPress={() => router.replace("/home")}
          style={[styles.skipText, { color: colors.onTertiary }]}
        >
          Skip
        </Text>
        <View style={{ flex: 3 }}>
          <FlatList
            ref={slidesRef}
            data={slides}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Paginator data={slides} scrollX={scrollX} />
          <NextButton scrollTo={scrollTo} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  lottie: {
    flex: 0.8,
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.2,
    marginVertical: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontWeight: "300",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  dot: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  skipText: {
    textAlign: "right",
    paddingHorizontal: 20,
  },
});
