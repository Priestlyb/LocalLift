import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 160,
    },

    backButton: {
        marginTop: 10,
        marginBottom: 20,
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
        width: "100%",
        height: "100%",
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

    successCard: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        marginBottom: 24,
    },

    successIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    successContent: {
        flex: 1,
        marginLeft: 12,
    },

    successTitle: {
        fontSize: 15,
        fontWeight: "700",
    },

    successSubtitle: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 20,
    },

    field: {
        marginBottom: 20,
    },

    label: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: "700",
    },

    inputWrapper: {
        height: 56,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
    },

    termsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },

    termsText: {
        marginLeft: 12,
        flex: 1,
        lineHeight: 22,
    },

    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 30,
    },

    continueButton: {
        height: 58,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },

    continueButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    loginText: {
        textAlign: "center",
        marginTop: 18,
        fontSize: 15,
        fontWeight: "600",
    },
});