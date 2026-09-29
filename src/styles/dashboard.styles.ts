import { StyleSheet } from "react-native";

export const dashboardHeaderStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    leftSection: {
        flex: 1,
    },

    greetingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    greeting: {
        fontSize: 14,
        fontWeight: "500",
    },

    businessName: {
        fontSize: 26,
        fontWeight: "700",
        marginTop: 6,
    },

    date: {
        fontSize: 13,
        marginTop: 4,
    },

    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    notificationDot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        position: "absolute",
        top: 10,
        right: 10,
    },
});

export const businessHeroCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    businessName: {
        fontSize: 22,
        fontWeight: "700",
    },

    businessType: {
        fontSize: 13,
        marginTop: 4,
    },

    aiBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },

    aiBadgeText: {
        fontSize: 12,
        fontWeight: "600",
    },

    description: {
        marginTop: 16,
        fontSize: 14,
        lineHeight: 22,
    },

    usageSection: {
        marginTop: 24,
    },

    usageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    usageLabel: {
        fontSize: 14,
        fontWeight: "600",
    },

    usageValue: {
        fontSize: 14,
        fontWeight: "700",
    },

    progressTrack: {
        height: 10,
        borderRadius: 999,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
    },

    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24,
    },

    primaryButton: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },

    secondaryButton: {
        height: 50,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    secondaryButtonText: {
        fontWeight: "600",
        fontSize: 14,
    },
});

export const analyticsSnapshotStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    viewAllText: {
        fontSize: 14,
        fontWeight: "600",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    metricCard: {
        width: "48%",
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    metricValue: {
        fontSize: 20,
        fontWeight: "700",
    },

    metricLabel: {
        fontSize: 13,
        marginTop: 4,
    },

    insightCard: {
        marginTop: 20,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },

    insightHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    insightTitle: {
        fontSize: 15,
        fontWeight: "600",
    },

    insightText: {
        fontSize: 13,
        lineHeight: 20,
    },
});

export const quickActionsStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    actionCard: {
        width: "48%",
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: "700",
    },

    actionSubtitle: {
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },
});


export const subscriptionCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    planBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },

    planBadgeText: {
        fontSize: 12,
        fontWeight: "600",
    },

    planCard: {
        marginTop: 20,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },

    planRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    planLabel: {
        fontSize: 13,
    },

    planValue: {
        fontSize: 13,
        fontWeight: "600",
    },

    progressTrack: {
        height: 10,
        borderRadius: 999,
        overflow: "hidden",
        marginTop: 4,
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
    },

    usageText: {
        fontSize: 12,
        marginTop: 10,
    },

    benefitCard: {
        marginTop: 16,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },

    benefitHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },

    benefitTitle: {
        fontSize: 15,
        fontWeight: "600",
    },

    benefitItem: {
        fontSize: 13,
        marginBottom: 8,
    },

    upgradeButton: {
        marginTop: 20,
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    upgradeButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});

export const aiInsightCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    titleRow: {
        flexDirection: "row",
        gap: 12,
        flex: 1,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },

    badge: {
        borderWidth: 1,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
    },

    insightCard: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
    },

    insightTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 8,
    },

    insightText: {
        fontSize: 13,
        lineHeight: 22,
    },

    recommendations: {
        marginTop: 20,
    },

    recommendationTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
    },

    recommendationItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    recommendationText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        lineHeight: 20,
    },

    actionButton: {
        marginTop: 20,
        height: 52,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});

export const recentContentCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    viewAllText: {
        fontSize: 14,
        fontWeight: "600",
    },

    contentCard: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    contentInfo: {
        flex: 1,
    },

    contentTitle: {
        fontSize: 14,
        fontWeight: "600",
    },

    contentType: {
        fontSize: 12,
        marginTop: 4,
    },

    metaContainer: {
        alignItems: "flex-end",
    },

    contentDate: {
        fontSize: 11,
        marginBottom: 4,
    },

    createButton: {
        marginTop: 8,
        height: 52,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    createButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});


export const aiRecommendationsCardStyles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 13,
        marginTop: 4,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: "700",
    },

    recommendationCard: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    content: {
        flex: 1,
    },

    recommendationTitle: {
        fontSize: 14,
        fontWeight: "600",
    },

    recommendationDescription: {
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },

    generateButton: {
        marginTop: 8,
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },

    generateButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },
});

export const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
    },

    content: {
        paddingBottom: 120,
    },
});