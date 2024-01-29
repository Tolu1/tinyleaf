import React, { useEffect } from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Index() {
  const [hasOnboarded, setHasOnboarded] = React.useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarded");
      if (value !== null) {
        setHasOnboarded(true);
      }
    } catch (err) {
      console.log("Error onboarded: ", err);
    } finally {
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return null;
  if (!hasOnboarded) {
    return <Redirect href="/onboarding/" />;
  }
  return <Redirect href="/home" />;
}

export default Index;
