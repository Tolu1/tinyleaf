import React from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import Colors from "@/constants/Colors";

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    primaryContainer: Colors.light.white,
    secondary: Colors.light.tint,
    secondaryContainer: Colors.light.tint,
    tertiary: Colors.light.white,
    background: Colors.light.background,
    onPrimary: Colors.light.white,
    onPrimaryContainer: Colors.light.black,
    onSecondary: Colors.light.white,
    onSecondaryContainer: Colors.light.white,
    onTertiary: Colors.light.gray,
    onBackground: Colors.light.black,
  },
};

function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}

export default AppProvider;
