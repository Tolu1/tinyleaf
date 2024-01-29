import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import { useTheme } from "react-native-paper";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import TypeWriter from "react-native-typewriter";

const milestonesSuggestions = [
  "Baby's First Words",
  "First Taste of Solid Food",
  "First Big Smile",
  "First Little Walk",
  "Mastering the Art of Crawling",
  "When Baby Discovered Their Reflection",
];

function Start() {
  const { colors } = useTheme();
  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const [currentSuggestion, setCurrentSuggestion] = useState("");

  const delayFunction = (suggestionLength: number) => {
    /**
     * Desmos Graph function
     * f\left(x\right)\ =\ l\ +\ \frac{u-l}{2+\ e^{\left(m-x\right)}}
     */
    const lowerBoundDelay = 2000; // Minimum delay
    const upperBoundDelay = 3000; // Maximum delay
    const midpoint = 10;
    return (
      lowerBoundDelay +
      (upperBoundDelay - lowerBoundDelay) /
        (1 + Math.exp(midpoint - suggestionLength))
    );
  };

  useEffect(() => {
    let index = 0;
    let previousLength = 0;
    let timeoutId: any;
    const logisticFunction = (x: number) => 1 / (1 + Math.exp(-x));
    const cycleSuggestions = () => {
      const suggestion =
        milestonesSuggestions[index % milestonesSuggestions.length];
      const suggestionLength = suggestion.length;

      const delay = Math.floor(logisticFunction(suggestionLength) * 4000);
      setCurrentSuggestion(suggestion);
      previousLength = suggestionLength;
      1;
      index++;
      timeoutId = setTimeout(() => {
        cycleSuggestions();
      }, delay);
    };

    cycleSuggestions();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        {currentSuggestion.length > 0 && (
          <View style={styles.textBubble}>
            <TypeWriter style={styles.textBubbleText} typing={1}>
              {currentSuggestion}
            </TypeWriter>
            <View style={styles.pointerContainer}>
              <View style={styles.pointer}></View>
            </View>
          </View>
        )}
        <LottieView
          source={require("@/assets/animations/tinyleaf.json")}
          autoPlay
          loop
          speed={0.4}
          style={styles.lottie}
        />
        <Text style={[styles.label, { color: colors.onTertiary }]}>
          Create a Milestone
        </Text>
        <TextInput
          style={styles.textInput}
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          {...(Platform.OS === "ios" ? { tintColor: colors.primary } : {})}
          autoFocus={true}
          textAlign="center"
          returnKeyType="done"
          onSubmitEditing={() => router.replace("/home")}
        />
      </View>
    </SafeAreaView>
  );
}

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    gap: 8,
  },
  textBubble: {
    height: 38,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    position: "relative",
  },
  textBubbleText: {
    fontSize: 14,
  },
  pointerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -8,
    left: 0,
    right: 0,
  },
  pointer: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderTopWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopColor: "#f0f0f0",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  lottie: {
    width: 70,
    height: 70,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    opacity: 0.6,
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 0,
    fontSize: 18,
    width: "80%",
  },
});
