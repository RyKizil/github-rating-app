import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    paddingRight: 10,
  },
  container: {
    /*flexDirection: "row",
    justifyContent: "space-between",*/
  },
});

const AppBarTab = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </View>
        <View>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBarTab;
