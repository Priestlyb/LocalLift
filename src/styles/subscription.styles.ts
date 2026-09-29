import { StyleSheet } from "react-native";

export const subscriptionStyles = StyleSheet.create({
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

    // =========================
    // CARD (shared)
    // =========================
    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 14,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
    },

    // =========================
    // PLAN INFO
    // =========================
    planName: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },

    planSubtitle: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 14,
    },

    // =========================
    // BUTTONS
    // =========================
    button: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    selectButton: {
        marginTop: 14,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    // =========================
    // USAGE
    // =========================
    usageText: {
        fontSize: 13,
        marginBottom: 10,
    },

    progressTrack: {
        height: 10,
        borderRadius: 20,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 20,
    },

    // =========================
    // PLANS SCREEN
    // =========================
    planCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 14,
    },

    badge: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 6,
    },

    price: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },

    features: {
        gap: 8,
        marginTop: 6,
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    featureText: {
        fontSize: 13,
    },
});