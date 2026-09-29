import { StyleSheet, ViewStyle, TextStyle } from "react-native";

type Theme = {
  primary: string;
  emerald: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
};

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    content: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 6,
    },

    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 30,
    },

    input: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 14,
      borderRadius: 10,
      color: theme.text,
    },

    button: {
      backgroundColor: theme.primary,
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 16,
    },

    buttonText: {
      color: theme.background,
      fontWeight: "600",
    },

    error: {
      color: "red",
      fontSize: 13,
      marginTop: 8,
    },

    link: {
      marginTop: 20,
      color: theme.primary,
      textAlign: "center",
      fontSize: 13,
    },

    successBox: {
      marginTop: 20,
      padding: 16,
      backgroundColor: theme.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border,
    } as ViewStyle,

    successText: {
      color: theme.text,
      fontSize: 14,
      marginBottom: 16,
    } as TextStyle,
  });