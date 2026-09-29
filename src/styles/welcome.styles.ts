import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },

  logo: {
    width: 125,
    height: 125,
    resizeMode: "contain",
  },

  brandName: {
    marginTop: 14,
    fontSize: 26,
    fontWeight: "800",
  },

  tagline: {
    fontSize: 14,
    marginTop: 4,
  },

  heroSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
  },

  iconRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 38,
  },

  subheading: {
    marginTop: 14,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  featuresSection: {
    paddingHorizontal: 24,
    marginTop: 30,
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },

  featureText: {
    fontWeight: "600",
    flex: 1,
  },

  previewCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    marginHorizontal: 24,
    marginTop: 24,
  },

  previewTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  previewItem: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  previewLabel: {
    fontWeight: "600",
    fontSize: 13,
  },

  plansSection: {
    paddingHorizontal: 24,
    marginTop: 30,
  },

  planCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },

  planTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  planPrice: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },

  planDesc: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },

  footer: {
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 40,
  },

  primaryButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginText: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "600",
  },
});