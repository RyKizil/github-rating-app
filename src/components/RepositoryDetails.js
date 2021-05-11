import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Button,
} from "react-native";
import { useParams } from "react-router-native";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
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
  btn: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const RepositoryDetails = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = !loading ? data.repository : [];

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View>
          <Image
            style={styles.logo}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text testID="textFullName" style={styles.cardHeaderText}>
            {repository.fullName}
          </Text>
          <View
            style={{
              width: (windowWidth / 5) * 3.75,
            }}
          >
            <Text>{repository.description}</Text>
          </View>
          <Tag title={repository.language} />
        </View>
      </View>
      <CardFooter
        starCount={repository.stargazersCount}
        forkCount={repository.forksCount}
        reviewCount={repository.reviewCount}
        ratingAverage={repository.ratingAverage}
      />
      <View style={styles.btn}>
        <Button color="#0065D4" title="Open in GitHub" />
      </View>
    </View>
  );
};

export default RepositoryDetails;
