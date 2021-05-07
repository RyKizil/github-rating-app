import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
//npimport useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem testID="repo" item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  //const { repositories } = useRepositories(); // this is for Rest api call

  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositoryNodes = !loading
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return <RepositoryListContainer repositories={repositoryNodes} />;
};

export default RepositoryList;
