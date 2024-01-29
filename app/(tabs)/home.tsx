import React from "react";
import { Text } from "@/components/StyledText";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Badge, Icon, useTheme } from "react-native-paper";
import BabyProfile from "@/components/home/BabyProfile";
import Spacing from "@/constants/Spacing";
import Spacer from "@/components/Spacer";
import { FlatGrid } from "react-native-super-grid";
import MilestoneCarousel from "@/components/home/MilestoneCarousel";
import Avatar from "@/components/Avatar";

function Header() {
  return (
    <View style={styles.header}>
      <View></View>
      <Text style={styles.headerText}>Home</Text>
      <Avatar />
    </View>
  );
}

type MenuCardProps = {
  key: string;
  label: string;
  image: ImageSourcePropType;
};

function MenuCard({ item }: { item: MenuCardProps }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuCard, { backgroundColor: colors.primaryContainer }]}
    >
      <Image style={{ width: 90, height: 90 }} source={item.image} />
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
      image: require("@/assets/images/pram.png"),
      label: "Milestone Moments",
    },
    {
      key: "essentials",
      image: require("@/assets/images/pram.png"),
      label: "Baby Essentials",
    },
    {
      key: "nap",
      image: require("@/assets/images/pram.png"),
      label: "Nap Time",
    },
    {
      key: "tips",
      image: require("@/assets/images/pram.png"),
      label: "Health Tips",
    },
    {
      key: "workout",
      image: require("@/assets/images/pram.png"),
      label: "Mommy & Me Workouts",
    },
    {
      key: "hacks",
      image: require("@/assets/images/pram.png"),
      label: "Parent Hacks",
    },
  ];

  return (
    <SafeAreaView style={safeContainerStyle}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    marginHorizontal: Spacing * 2,
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
