import React from "react";
import { Text } from "@/components/StyledText";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function Explore() {
  const { colors } = useTheme();

  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        <Text>Explore</Text>
      </View>
    </SafeAreaView>
  );
}

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
