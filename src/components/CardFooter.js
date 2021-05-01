import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";

import { roundAfterThousand } from "../utils/helper";

const styles = StyleSheet.create({
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  text: {
    fontWeight: theme.fontWeights.bold,
  },
  footerItem: {
    alignItems: "center",
  },
});

const CardFooter = ({ starCount, forkCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.cardFooter}>
      <View style={styles.footerItem}>
        <Text style={styles.text}>{roundAfterThousand(starCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.footerItem}>
        <Text style={styles.text}>{roundAfterThousand(forkCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.footerItem}>
        <Text style={styles.text}>{roundAfterThousand(reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.footerItem}>
        <Text style={styles.text}>{roundAfterThousand(ratingAverage)}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default CardFooter;
