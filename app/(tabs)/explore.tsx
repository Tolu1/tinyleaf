import React from "react";
import { Text } from "@/components/StyledText";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import Spacing from "@/constants/Spacing";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "@/components/Avatar";
import Spacer from "@/components/Spacer";
import { FlatGrid } from "react-native-super-grid";

function Header() {
  return (
    <View style={styles.header}>
      <View></View>
      <Text style={styles.headerText}>Explore</Text>
      <Avatar />
    </View>
  );
}

type MenuCardProps = {
  key: string;
  label: string;
  image: ImageSourcePropType;
  backgroundColor: string;
};

function MenuCard({ item }: { item: MenuCardProps }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.menuCard,
        { backgroundColor: item.backgroundColor || colors.primaryContainer },
      ]}
    >
      <Image style={{ width: 90, height: 90 }} source={item.image} />
      <Text style={{ color: colors.onPrimaryContainer }} variant="titleMedium">
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

function Explore() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");

  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const navigationMenuItems = [
    {
      key: "popular",
      image: require("@/assets/images/popular.png"),
      label: "Popular",
      backgroundColor: "#D4EEE3",
    },
    {
      key: "firsts",
      image: require("@/assets/images/firsts.png"),
      label: "Firsts",
      backgroundColor: "#D7DAF2",
    },
    {
      key: "playtime",
      image: require("@/assets/images/playtime.png"),
      label: "Playtime",
      backgroundColor: "#FCF3F0",
    },
    {
      key: "eating",
      image: require("@/assets/images/eating.png"),
      label: "Eating",
      backgroundColor: "#E5EBD7",
    },
    {
      key: "friendship",
      image: require("@/assets/images/friendship.png"),
      label: "Friendship",
      backgroundColor: "#F7D7D7",
    },
    {
      key: "memories",
      image: require("@/assets/images/memories.png"),
      label: "Memories",
      backgroundColor: "#F6E8DE",
    },
    {
      key: "growth",
      image: require("@/assets/images/growth.png"),
      label: "Growth",
      backgroundColor: "#D6F0FF",
    },
    {
      key: "achievements",
      image: require("@/assets/images/achievements.png"),
      label: "Achievements",
      backgroundColor: "#F1F0E8",
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
        <Searchbar
          theme={{
            colors: {
              onSurface: colors.onTertiary,
              elevation: {
                level3: colors.secondary,
              },
            },
          }}
          style={[
            styles.searchbar,
            {
              backgroundColor: colors.primaryContainer,
              borderColor: colors.primary,
            },
          ]}
          placeholder="Search milestones and moments..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
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

export default Explore;

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
  searchbar: {
    borderRadius: 10,
    borderWidth: 1,
  },
  gridView: {
    margin: -10,
    flex: 1,
  },
  menuCard: {
    flex: 1,
    paddingVertical: 20,
    gap: 10,
    alignItems: "center",
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0.75,
    },
    shadowOpacity: 0.06,
    shadowRadius: 0.75,
    elevation: 1,
  },
});
