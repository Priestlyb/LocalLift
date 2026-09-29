import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
    },

    content: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 20,
    },

    list: {
        marginTop: 10,
        gap: 12,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
    },

    iconWrapper: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    textContainer: {
        flex: 1,
    },

    itemTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 4,
    },

    itemSubtitle: {
        fontSize: 12,
        lineHeight: 16,
    },
});