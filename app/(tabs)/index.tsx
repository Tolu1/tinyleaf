import React from "react";
import { Redirect, useRootNavigationState } from "expo-router";

function Index() {
  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return null;
  return <Redirect href="/home" />;
}

export default Index;
