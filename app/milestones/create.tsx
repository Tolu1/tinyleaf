import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  CreateMilestoneSchema,
  CreateMilestoneSchemaProps,
} from "@/zodShemas/createMilestone.schema";
import { TextInput } from "@/components/TextInput";
import { useMilestoneStore } from "@/store/milestones.store";
import { z } from "zod";

const CreateMilestone: React.FC = () => {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [isCalendarOpenForAndroid, setIsCalendarOpenForAndroid] =
    React.useState<boolean>(false);
  const methods = useForm<CreateMilestoneSchemaProps>({
    resolver: zodResolver(CreateMilestoneSchema),
    mode: "onBlur",
  });

  const createMilestone = useMilestoneStore((state) => state.createMilestone);
  const onSubmit: SubmitHandler<z.infer<typeof CreateMilestoneSchema>> = (
    data
  ) => {
    createMilestone(data);
    methods.reset();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Milestone</Text>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <Controller
              control={methods.control}
              name="title"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  label="Title"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="date"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View style={styles.dateWrapper}>
                  <Text style={styles.label}>Milestone Date</Text>
                  {Platform.OS === "android" && (
                    <Button
                      onPress={() => {
                        setIsCalendarOpenForAndroid(true);
                      }}
                    >
                      {value.toString()}
                    </Button>
                  )}
                  {(isCalendarOpenForAndroid || Platform.OS !== "android") && (
                    <RNDateTimePicker
                      value={new Date() || new Date()}
                      style={styles.dateTimePicker}
                      mode={"date"}
                      onChange={(e) => {
                        if (Platform.OS === "android") {
                          setIsCalendarOpenForAndroid(false);
                        }
                        if (e.type === "set" && e.nativeEvent.timestamp) {
                          onChange(new Date(e.nativeEvent.timestamp));
                          methods.trigger("date");
                        }
                      }}
                    />
                  )}
                  {!!error?.message && (
                    <Text style={styles.errorMessageText}>{error.message}</Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={methods.control}
              name="description"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  label="Description"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                  multiline
                />
              )}
            />
            <Button mode="outlined" onPress={methods.handleSubmit(onSubmit)}>
              Create Milestone
            </Button>
          </View>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Change the color to a suitable one
  },
  form: {
    backgroundColor: "#fff", // Change the background color
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    gap: 20,
  },
  label: {
    color: "#000",
    marginBottom: 6,
    fontSize: 16, // Increase the font size for labels
  },
  errorMessageText: {
    color: "red",
    fontSize: 14,
  },
  dateWrapper: {
    marginBottom: 16,
  },
  dateTimePicker: {
    alignSelf: "flex-start",
  },
  safeArea: {
    flex: 1,
  },
});

export default CreateMilestone;
