import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Tag from "./Tag";

const styles = StyleSheet.create({
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  cardHeaderText: {
    color: theme.colors.black,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 4,
  },
  logo: {
    width: 61,
    height: 62,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  container: {
    backgroundColor: theme.colors.white,
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.cardHeader}>
      <View>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View>
        <Text style={styles.cardHeaderText}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Tag title={item.language} />
      </View>
    </View>
    <Text>Stars: {item.stargazersCount}</Text>
    <Text>Forks: {item.forksCount}</Text>
    <Text>Reviews: {item.reviewCount}</Text>
    <Text>Rating: {item.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
