import React from "react";
import { Text } from "@/components/StyledText";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Searchbar, useTheme } from "react-native-paper";
import Spacing from "@/constants/Spacing";
import { AntDesign } from "@expo/vector-icons";
import Spacer from "@/components/Spacer";
import { useMilestoneStore, MilestoneProps } from "@/store/milestones.store";
import { Link, router, useRouter } from "expo-router";

function Header() {
  return (
    <View style={styles.header}>
      <View></View>
      <Text style={styles.headerText}>Milestones</Text>
      <Link href="/milestones/create" asChild>
        <AntDesign name="plus" size={32} />
      </Link>
    </View>
  );
}

// Assuming you want to keep the image, we'll use a default image for now
const defaultImage = require("@/assets/images/pram.png"); // Adjust the path to your default image

function MilestoneItem({ item }: { item: MilestoneProps }) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.milestoneItem}
      onPress={() => router.push(`/milestones/${item.id}`)}
    >
      <Image style={styles.milestoneImage} source={defaultImage} />
      <View style={styles.milestoneInfo}>
        <Text
          style={{ color: colors.onPrimaryContainer }}
          variant="titleMedium"
        >
          {item.title}
        </Text>
        <Text style={{ color: colors.onSecondary }} variant="bodySmall">
          {item.date}
        </Text>
        {item.description && (
          <Text style={{ color: colors.onTertiary }} variant="bodySmall">
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function Milestones() {
  const { colors } = useTheme();
  const safeContainerStyle = { flex: 1, backgroundColor: colors.background };

  const [searchQuery, setSearchQuery] = React.useState("");
  const milestones = useMilestoneStore((state) => state.milestones);

  return (
    <SafeAreaView style={safeContainerStyle}>
      <View style={styles.container}>
        <Header />
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
          placeholder="Search milestones..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Spacer size={25} />
        <FlatList
          data={milestones}
          renderItem={({ item }) => <MilestoneItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.milestoneList}
        />
        <Button
          mode="outlined"
          onPress={() => router.push("/milestones/create")}
        >
          Create Milestone
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Milestones;

// Styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing * 2,
    paddingBottom: Spacing * 2,
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
  milestoneList: {
    paddingHorizontal: Spacing,
    paddingBottom: 20,
  },
  milestoneItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  milestoneImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  milestoneInfo: {
    flex: 1,
  },
});
