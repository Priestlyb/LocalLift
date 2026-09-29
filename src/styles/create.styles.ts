import { StyleSheet } from "react-native";

export const createStyles = StyleSheet.create({
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
        marginBottom: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 22,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },

    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    optionChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        minWidth: 90,
        alignItems: "center",
        justifyContent: "center",
    },

    promptInput: {
        minHeight: 140,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        textAlignVertical: "top",
        lineHeight: 22,
    },

    contextCard: {
        borderRadius: 18,
        borderWidth: 1,
        padding: 16,
        marginBottom: 24,
    },

    contextTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
    },

    contextItem: {
        fontSize: 14,
        marginBottom: 6,
        lineHeight: 20,
    },

    generateButton: {
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },

    generateButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    /*
     * Future-ready styles
     * Useful when you later add templates,
     * AI suggestions, or content types.
     */

    card: {
        borderRadius: 18,
        borderWidth: 1,
        padding: 16,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
    },

    cardDescription: {
        fontSize: 13,
        lineHeight: 20,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    spaceBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});