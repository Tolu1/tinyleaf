import React from "react";
import { Text } from "@/components/StyledText";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Badge, Icon, useTheme } from "react-native-paper";
import BabyProfile from "@/components/home/BabyProfile";
import Spacing from "@/constants/Spacing";
import Spacer from "@/components/Spacer";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { FlatGrid } from "react-native-super-grid";
import MilestoneCarousel from "@/components/home/MilestoneCarousel";

function Header() {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View></View>
      <Text style={styles.headerText}>Home</Text>
      <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
        <Avatar.Image size={35} source={{ uri: "https://i.pravatar.cc/32" }} />
      </View>
    </View>
  );
}

type MenuCardProps = {
  key: string;
  label: string;
  icon: IconSource;
};

function MenuCard({ item }: { item: MenuCardProps }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuCard, { backgroundColor: colors.primaryContainer }]}
    >
      <Icon source="camera" color={colors.primary} size={20} />
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
}

function Home() {
  const { colors } = useTheme();

  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const navigationMenuItems = [
    {
      key: "milestone",
      icon: {
        uri: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/pill-icon.png",
      },
      label: "Milestone Moments",
    },
    {
      key: "essentials",
      icon: {
        uri: "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Running-icon.png",
      },
      label: "Baby Essentials",
    },
    {
      key: "nap",
      icon: {
        uri: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/pill-icon.png",
      },
      label: "Nap Time",
    },
    {
      key: "tips",
      icon: {
        uri: "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Running-icon.png",
      },
      label: "Health Tips",
    },
    {
      key: "workout",
      icon: {
        uri: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/pill-icon.png",
      },
      label: "Mommy & Me Workouts",
    },
    {
      key: "hacks",
      icon: {
        uri: "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Running-icon.png",
      },
      label: "Parent Hacks",
    },
  ];

  return (
    <SafeAreaView style={safeContainerStyle}>
      <ScrollView style={styles.container}>
        <Header />
        <Text style={{ color: colors.onTertiary }} variant="bodyMedium">
          Hello Fadekemi,
        </Text>
        <Spacer size={25} />
        <BabyProfile />
        <Spacer size={25} />
        <View style={styles.badgeContainer}>
          <Text variant="headlineSmall">Favourite Milestones</Text>
          <View>
            <Badge size={18} theme={{ colors: { error: colors.primary } }}>
              3
            </Badge>
          </View>
        </View>
        <Spacer size={25} />
        <MilestoneCarousel />

        <Spacer size={25} />
        <FlatGrid
          scrollEnabled={false}
          itemDimension={130}
          spacing={10}
          data={navigationMenuItems}
          style={styles.gridView}
          renderItem={({ item }) => <MenuCard item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
  },
  header: {
    flexDirection: "row",
    marginLeft: 35,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
  },
  avatarContainer: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 1,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  gridView: {
    margin: -10,
    flex: 1,
  },
  menuCard: {
    flex: 1,
    paddingVertical: 50,
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowOpacity: 0.06,
    shadowRadius: 0.75,
    elevation: 1,
  },
});
