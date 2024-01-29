import React from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding.store";

function Index() {
  const onboarded = useOnboardingStore((state) => state.onboarded);

  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return null;

  if (!onboarded) {
    return <Redirect href="/onboarding/" />;
  }

  return <Redirect href="/home" />;
}

export default Index;
