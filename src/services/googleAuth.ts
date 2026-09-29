// npm install axios @tanstack/react-query

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const expoConfig =
  Constants.expoConfig ??
  Constants.manifest2?.extra?.expoClient;

const redirectUri = AuthSession.makeRedirectUri({
  scheme: expoConfig?.scheme,
});

export interface GoogleAuthResult {
  idToken: string;
}

export function useGoogleAuth() {
  const [request, response, promptAsync] =
    Google.useIdTokenAuthRequest({
      clientId:
        process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,

      androidClientId:
        process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,

      iosClientId:
        process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,

      redirectUri,
    });

  const signIn = async (): Promise<GoogleAuthResult> => {
    const result = await promptAsync();

    if (result.type !== "success") {
      throw new Error(
        "Google sign in was cancelled."
      );
    }

    const authentication =
      result.authentication;

    if (!authentication?.idToken) {
      throw new Error(
        "Unable to obtain Google ID token."
      );
    }

    return {
      idToken: authentication.idToken,
    };
  };

  return {
    request,
    response,
    signIn,
  };
}