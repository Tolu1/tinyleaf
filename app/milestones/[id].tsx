import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import Spacing from "@/constants/Spacing";
import Spacer from "@/components/Spacer";
import { useMilestoneStore } from "@/store/milestones.store";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="chevron-small-left" size={32} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Milestone Detail</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons opacity={0.8} name="dots-vertical" size={32} />
      </TouchableOpacity>
    </View>
  );
}

function MilestoneDetails() {
  const { id } = useLocalSearchParams();

  const { colors } = useTheme();
  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const milestones = useMilestoneStore((state) => state.milestones);
  const milestone = milestones.find((m) => m.id === id);

  if (!milestone) {
    return (
      <SafeAreaView style={safeContainerStyle}>
        <Text style={{ color: colors.onSurface }}>Milestone not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={safeContainerStyle}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Spacer size={Spacing} />
        <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
          {milestone.title}
        </Text>
        <Text style={[styles.date, { color: colors.onSurfaceVariant }]}>
          {new Date(milestone.date).toDateString()}
        </Text>
        <Spacer size={Spacing} />
        <Image
          source={require("@/assets/images/pram.png")}
          style={styles.image}
        />
        <Spacer size={Spacing} />
        <Text style={[styles.description, { color: colors.onSurface }]}>
          {milestone.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
    gap: Spacing,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    opacity: 0.7,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default MilestoneDetails;
