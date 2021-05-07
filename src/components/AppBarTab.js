import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link } from "react-router-native";
import LoginContext from "../contexts/LoginContext";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    paddingRight: 10,
  },
});

const AppBarTab = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <View>
      <ScrollView horizontal>
        <View>
          <Link to="/repositories">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </View>
        <View>
          <Link to="/">
            <Text style={styles.text}>
              {isLoggedIn ? "Sign out" : "Sign in"}
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBarTab;
