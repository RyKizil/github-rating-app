import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    return await mutate({ variables: { username, password } });
  };

  return [signIn, result];
};
