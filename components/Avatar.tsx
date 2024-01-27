import { View, StyleSheet } from "react-native";
import React, { useId } from "react";
import { Avatar as OriginalAvatar, useTheme } from "react-native-paper";
import { randomUUID } from "expo-crypto";

const id = randomUUID();

function Avatar() {
  const { colors } = useTheme();

  return (
    <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
      <OriginalAvatar.Image
        size={35}
        source={{ uri: `https://i.pravatar.cc/35?u=${id}` }}
      />
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 1,
  },
});
