import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import theme from "../theme";
import Tag from "./Tag";
import CardFooter from "./CardFooter";

const windowWidth = Dimensions.get("window").width;

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
        <View
          style={{
            width: (windowWidth / 5) * 3.75,
          }}
        >
          <Text>{item.description}</Text>
        </View>
        <Tag title={item.language} />
      </View>
    </View>
    <CardFooter
      starCount={item.stargazersCount}
      forkCount={item.forksCount}
      reviewCount={item.reviewCount}
      ratingAverage={item.ratingAverage}
    />
  </View>
);

export default RepositoryItem;
