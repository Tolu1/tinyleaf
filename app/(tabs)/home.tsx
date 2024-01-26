import React from "react";
import { Text } from "@/components/StyledText";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function Home() {
  const { colors } = useTheme();

  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
