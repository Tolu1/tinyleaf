import React from "react";
import {
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import Badgeable from "@/components/Badgeable";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#2F322F",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Baby",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="baby-face-outline"
              size={26}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <Badgeable badgeCount={2}>
              <AntDesign
                name="appstore-o"
                size={26}
                style={{ marginBottom: -3 }}
                color={color}
              />
            </Badgeable>
          ),
        }}
      />
      <Tabs.Screen
        name="milestones"
        options={{
          title: "Milestones",
          tabBarIcon: ({ color }) => (
            <Badgeable badgeCount={3}>
              <Octicons
                name="milestone"
                size={25}
                style={{ marginBottom: -3 }}
                color={color}
              />
            </Badgeable>
          ),
        }}
      />
    </Tabs>
  );
}
