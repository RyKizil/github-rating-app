import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  text: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 6,
    marginTop: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

const Tag = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Tag;
