import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessTokens = await AsyncStorage.getItem(
      `${this.namespace}:accessTokens`
    );

    return accessTokens ? JSON.parse(accessTokens) : [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    const currentAccessTokens = await this.getAccessToken();
    const newAccessTokens = [...currentAccessTokens, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:accessTokens`,
      JSON.stringify(newAccessTokens)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:accessTokens`);
  }
}

export default AuthStorage;
