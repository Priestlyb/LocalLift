import { StyleSheet } from "react-native";

export const businessBrandingStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 175,
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
        width: "66%",
        height: "100%",
        borderRadius: 999,
    },

    progressText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: "500",
    },

    header: {
        marginBottom: 30,
    },

    heading: {
        fontSize: 24,
        fontWeight: "800",
        lineHeight: 40,
    },

    subheading: {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 24,
    },

    field: {
        marginBottom: 24,
    },

    label: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 10,
    },

    aiTipCard: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
        marginBottom: 24,
    },

    aiTipTitle: {
        fontSize: 15,
        fontWeight: "700",
    },

    aiTipText: {
        marginTop: 8,
        lineHeight: 22,
        fontSize: 14,
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
    },

    textAreaWrapper: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
    },

    textArea: {
        minHeight: 120,
        marginTop: 12,
        textAlignVertical: "top",
        fontSize: 15,
    },

    voiceGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    voiceChip: {
        borderWidth: 1,
        borderRadius: 999,
        paddingHorizontal: 18,
        paddingVertical: 12,
    },

    voiceText: {
        fontSize: 14,
        fontWeight: "600",
    },

    uploadCard: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 20,
        paddingVertical: 28,
        alignItems: "center",
    },

    uploadText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "700",
    },

    uploadSubtext: {
        marginTop: 4,
        fontSize: 13,
    },

    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 0,
        paddingBottom: 20,
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
});