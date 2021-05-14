import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Text,
} from "react-native";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { CREATE_USER, AUTHORIZE_USER } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";
import LoginContext from "../contexts/LoginContext";

const windowsWidth = Dimensions.get("window").width;

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  innerContainer: {
    width: (windowsWidth / 10) * 9,
  },
  input: {
    //borderColor: theme.colors.error,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
  },
  errorText: {
    color: theme.colors.error,
  },
});

const CreateReview = () => {
  //const [signIn] = useSignIn();
  const { login, logout, isLoggedIn } = useContext(LoginContext);
  const apolloClient = useApolloClient();
  let history = useHistory();
  const authStorage = useAuthStorage();
  const [createUser] = useMutation(CREATE_USER);
  const [authorize] = useMutation(AUTHORIZE_USER);

  const handleLogout = () => {
    logout();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.owner) {
      errors.owner = "Repository owner name is required";
    } else if (values.owner.length > 20) {
      errors.username = "Must be 20 characters or less";
    }

    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.name) {
      errrors.name = "Name is required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      owner: "",
      name: "",
      rating: "",
      review: "",
    },
    validate,
    onSubmit: async (values) => {
      const { owner, name, rating, review } = values;
      /*try {
        const { data } = await createUser({
          variables: { username: username, password: password },
        });
        login();

        console.log(data);
      } catch (e) {
        console.log(e);
      }
      const { data } = await authorize({
        variables: { username: username, password: password },
      });
      history.push("/repositories");
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      */
    },
  });
  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <Formik
          initialValues={{ owner: "", name: "", rating: "", review: "" }}
          onSubmit={(values) => console.log("values: ", values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <View style={styles.innerContainer}>
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("owner")}
                onBlur={formik.handleBlur("owner")}
                value={formik.values.owner}
                placeholder="Repository owner name"
              />
              {formik.touched.owner && formik.errors.owner ? (
                <Text style={styles.errorText}>{formik.errors.owner}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                placeholder="Repository name"
              />
              {formik.touched.name && formik.errors.name ? (
                <Text style={styles.errorText}>{formik.errors.name}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("owner")}
                onBlur={formik.handleBlur("owner")}
                value={formik.values.owner}
                placeholder="owner"
              />
              {formik.touched.owner && formik.errors.owner ? (
                <Text style={styles.errorText}>{formik.errors.owner}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                placeholder="name"
              />
              {formik.touched.name && formik.errors.name ? (
                <Text style={styles.errorText}>{formik.errors.name}</Text>
              ) : null}
              <Button title="Sign in" onPress={formik.handleSubmit} />
            </View>
          )}
        </Formik>
      ) : (
        <View
          style={{
            marginTop: 250,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            You sure you want to logout?
          </Text>
          <Button title="logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

export default CreateReview;
