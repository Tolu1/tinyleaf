import { Text } from "../StyledText";
import { View, StyleSheet, Image } from "react-native";
import React from "react";
import Spacing from "@/constants/Spacing";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function BabyProfile() {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <View style={[styles.firstRow]}>
        <View style={{ position: "relative" }}>
          <Ionicons name="ellipse" size={80} color={colors.secondary} />
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -20 }, { translateY: -20 }],
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={require("@/assets/images/pram.png")}
            />
          </View>
        </View>
        <Text style={{ color: colors.onTertiary }} variant="bodyMedium">
          Your Little One's Info
        </Text>
      </View>
      <View style={styles.secondRow}>
        <View style={styles.gap}>
          <Text style={{ color: colors.onTertiary }} variant="bodyMedium">
            Baby Height
          </Text>
          <Text>21 cm</Text>
        </View>
        <View style={styles.gap}>
          <Text style={{ color: colors.onTertiary }} variant="bodyMedium">
            Baby Weight
          </Text>
          <Text>1.3 kg</Text>
        </View>
        <View style={styles.gap}>
          <Text style={{ color: colors.onTertiary }} variant="bodyMedium">
            Baby Age
          </Text>
          <Text>173 days</Text>
        </View>
      </View>
    </View>
  );
}

export default BabyProfile;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    rowGap: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowOpacity: 0.06,
    shadowRadius: 0.75,
    elevation: 1,
  },
  firstRow: {
    flexDirection: "row",
    columnGap: Spacing * 2,
    alignItems: "center",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mediumText: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
  },
  gap: {
    gap: Spacing,
  },
});
