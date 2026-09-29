import { StyleSheet } from "react-native";

export const historyHeaderStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
        maxWidth: 260,
        lineHeight: 18,
    },

    actionButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const historySearchStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    input: {
        flex: 1,
        fontSize: 14,
    },

    rightIcon: {
        paddingLeft: 6,
        borderLeftWidth: 1,
        borderLeftColor: "rgba(148,163,184,0.2)",
    },
});


export const historyFiltersStyles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    scrollContent: {
        paddingHorizontal: 20,
        gap: 10,
    },

    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        marginRight: 10,
    },

    filterText: {
        fontSize: 13,
        fontWeight: "600",
    },
});


export const contentHistoryCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 12,
        borderRadius: 18,
        borderWidth: 1,
        padding: 16,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    titleRow: {
        flexDirection: "row",
        flex: 1,
        gap: 12,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    titleBlock: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
    },

    type: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: "600",
    },

    time: {
        fontSize: 11,
    },

    preview: {
        fontSize: 13,
        marginTop: 12,
        lineHeight: 18,
    },

    actions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },

    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
    },

    actionText: {
        fontSize: 12,
        fontWeight: "600",
    },
});


export const emptyHistoryStateStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },

    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginBottom: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 13,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 25,
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 14,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});

export const historyStyles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 55,
    },

    content: {
        paddingBottom: 120,
    },
})