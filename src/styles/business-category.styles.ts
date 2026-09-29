import { StyleSheet } from "react-native";

export const businessCategoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 140,
    },

    backButton: {
        marginTop: 10,
        marginBottom: 24,
    },

    progressWrapper: {
        marginBottom: 24,
    },

    progressTrack: {
        height: 8,
        borderRadius: 999,
        overflow: "hidden",
    },

    progressFill: {
        width: "33%",
        height: "100%",
        borderRadius: 999,
    },

    progressText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: "500",
    },

    header: {
        marginBottom: 24,
    },

    heading: {
        fontSize: 32,
        fontWeight: "800",
        lineHeight: 40,
    },

    subheading: {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 24,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 24,
    },

    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
    },

    categoriesContainer: {
        gap: 14,
    },

    categoryCard: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 20,
        padding: 18,
    },

    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    categoryInfo: {
        marginLeft: 16,
        flex: 1,
    },

    categoryTitle: {
        fontSize: 17,
        fontWeight: "700",
    },

    categorySubtitle: {
        marginTop: 4,
        fontSize: 13,
    },

    footer: {
        position: "absolute",
        bottom: 30,
        left: 24,
        right: 24,
    },

    continueButton: {
        height: 58,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    continueButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});