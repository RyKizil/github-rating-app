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
import { useSignIn } from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";

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

const SignIn = () => {
  //const [signIn] = useSignIn();
  const apolloClient = useApolloClient();
  let history = useHistory();
  const authStorage = useAuthStorage();
  const [createUser] = useMutation(CREATE_USER);
  const [authorize] = useMutation(AUTHORIZE_USER);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 20) {
      errors.username = "Must be 20 characters or less";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const { data } = await createUser({
          variables: { username: username, password: password },
        });

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
    },
  });
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
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
              onChangeText={formik.handleChange("username")}
              onBlur={formik.handleBlur("username")}
              value={formik.values.username}
              placeholder="username"
            />
            {formik.touched.username && formik.errors.username ? (
              <Text style={styles.errorText}>{formik.errors.username}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}
              secureTextEntry={true}
              placeholder="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            ) : null}
            <Button title="Sign in" onPress={formik.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;