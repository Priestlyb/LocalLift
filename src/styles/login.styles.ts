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

type LoginStyles = {
    container: ViewStyle;
    content: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    form: ViewStyle;
    input: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    error: TextStyle;
    link: TextStyle;
};

export const getStyles = (theme: Theme): LoginStyles =>
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
            fontSize: 28,
            fontWeight: "700",
            color: theme.text,
            marginBottom: 6,
        },

        subtitle: {
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 30,
        },

        form: {
            gap: 12,
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
            marginTop: 10,
        },

        buttonText: {
            color: theme.background,
            fontWeight: "600",
        },

        error: {
            color: "red",
            fontSize: 13,
        },

        link: {
            marginTop: 16,
            color: theme.primary,
            textAlign: "center",
            fontSize: 13,
        },
    });