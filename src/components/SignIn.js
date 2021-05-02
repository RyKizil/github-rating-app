import React from "react";
import { View, StyleSheet, TextInput, Button, Dimensions } from "react-native";
import { Formik } from "formik";
import theme from "../theme";

const windowsWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  innerContainer: {
    width: (windowsWidth / 10) * 9,
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values: ", values);
        }}
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
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholder="username"
            />

            <TextInput
              style={styles.input}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              placeholder="password"
            />

            <Button title="Sign in" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
