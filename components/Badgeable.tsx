import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Badge, useTheme } from "react-native-paper";

type BadgeableProps = {
  children: React.ReactNode;
  badgeCount: number;
  style?: ViewStyle;
};

function Badgeable({
  children,
  badgeCount,
  style,
}: BadgeableProps): React.ReactElement<BadgeableProps> {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.badgeContainer}>
        {children}
        {badgeCount > 0 && (
          <Badge
            size={18}
            theme={{ colors: { error: colors.primary } }}
            style={styles.badge}
          >
            {badgeCount}
          </Badge>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  badgeContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -15,
    zIndex: 1,
  },
});

export default Badgeable;
