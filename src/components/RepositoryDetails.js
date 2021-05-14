import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Button,
  FlatList,
} from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import format from "date-fns/format";
import theme from "../theme";
import { getDateFormat } from "../utils/helper";
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

const RepositoryDetail = ({ repository }) => {
  if (!repository) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={[styles.container, { marginBottom: 7 }]}>
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
        <Button color="#0065D4" title="Open in GitHub" onPress={handlePress} />
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View
      style={[
        styles.container,
        { marginBottom: 7, flex: 1, flexDirection: "row" },
      ]}
    >
      <View
        style={{
          marginHorizontal: 25,
          marginBottom: 25,
          marginTop: 10,
          width: 50,
          height: 50,
          borderRadius: 50,
          borderColor: theme.colors.lightBlue,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            width: 30,
            textAlign: "center",
            margin: 9,
            marginTop: 12,
            color: theme.colors.lightBlue,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {review.node.rating}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 12,
          marginRight: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: theme.fontWeights.bold }}>
          {review.node.user.username}
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          {getDateFormat(review.node.createdAt)}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryDetails = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = !loading ? data.repository : [];

  useEffect(() => {
    if (!loading) {
      setReviews(repository.reviews.edges);
    }
  }, []);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryDetail repository={repository} />}
    />
  );
};

export default RepositoryDetails;
