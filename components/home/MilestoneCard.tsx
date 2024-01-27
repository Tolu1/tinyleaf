import React from "react";
import { Text } from "../StyledText";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Spacing from "@/constants/Spacing";

type MilestoneCardProps = {
  title: string;
  description: string;
  date: string;
};

function MilestoneCard({ title, description, date }: MilestoneCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.onTertiary }]}>
        {description}
      </Text>
      <Text style={[styles.date, { color: colors.onTertiary }]}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: Spacing,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowOpacity: 0.06,
    shadowRadius: 0.75,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Spacing / 2,
  },
  description: {
    fontSize: 14,
    marginBottom: Spacing / 2,
  },
  date: {
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default MilestoneCard;
