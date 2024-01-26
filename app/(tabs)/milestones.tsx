import React from "react";
import { Text } from "@/components/StyledText";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function Milestones() {
  const { colors } = useTheme();

  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        <Text>Milestones</Text>
      </View>
    </SafeAreaView>
  );
}

export default Milestones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
