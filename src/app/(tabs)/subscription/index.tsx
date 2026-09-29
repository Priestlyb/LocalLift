import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useSubscription } from "@/hooks/useSubscription";
import FeedbackModal from "@/components/ui/FeedbackModal";

import { subscriptionStyles as styles } from "@/styles/subscription.styles";
import { IconSymbol } from "@/constants/icons/icon-symbol";

export default function SubscriptionScreen() {
  const theme = useTheme();

  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error" as
      | "error"
      | "success"
      | "warning"
      | "info",
    buttonText: "Okay",
    secondaryButtonText:
      undefined as string | undefined,
    dangerButtonText:
      undefined as string | undefined,
    onSecondaryPress:
      undefined as (() => void) | undefined,
    onDangerPress:
      undefined as (() => void) | undefined,
  });

  const {
    subscription,
    limits,
    loading,
    error,

    fetchSubscription,
    cancelSubscription,
    refreshUsage,
  } = useSubscription();

  /**
   * Refresh every time the screen becomes active.
   */
  useFocusEffect(
    useCallback(() => {
      fetchSubscription();
      refreshUsage();
    }, []),
  );

  /**
   * Initial load.
   */
  useEffect(() => {
    fetchSubscription();
    refreshUsage();
  }, []);

  /**
   * Show an error modal when the
   * subscription request fails.
   */
  useEffect(() => {
    if (!error) {
      return;
    }

    console.log(
      "[SUBSCRIPTION ERROR]",
      error,
    );

    showModal({
      title: "Unable to Load Subscription",
      message:
        "We couldn't load your subscription information right now. Please try again later.",
      type: "error",
      buttonText: "Okay",
    });
  }, [error]);

  /**
   * Close feedback modal.
   */
  const closeModal = () => {
    setModal((previous) => ({
      ...previous,
      visible: false,
    }));
  };

  /**
   * Show feedback modal.
   */
  const showModal = ({
    title,
    message,
    type = "error",
    buttonText = "Okay",
    secondaryButtonText,
    dangerButtonText,
    onSecondaryPress,
    onDangerPress,
  }: {
    title: string;
    message: string;
    type?:
      | "error"
      | "success"
      | "warning"
      | "info";
    buttonText?: string;
    secondaryButtonText?: string;
    dangerButtonText?: string;
    onSecondaryPress?: () => void;
    onDangerPress?: () => void;
  }) => {
    setModal({
      visible: true,
      title,
      message,
      type,
      buttonText,
      secondaryButtonText,
      dangerButtonText,
      onSecondaryPress,
      onDangerPress,
    });
  };

  /**
   * Format a date.
   */
  const formatDate = (
    date?: string | null,
  ) => {
    if (!date) {
      return "--";
    }

    return new Date(date).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  };

  /**
   * Format currency.
   */
  const formatCurrency = (
    amount?: number | null,
  ) => {
    if (amount == null) {
      return "--";
    }

    return `₦${amount.toLocaleString()}`;
  };

  /**
   * Convert plan/status values
   * into readable text.
   */
  const prettify = (value: string) => {
    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase(),
      )
      .trim();
  };

  /**
   * Generic detail row.
   */
  const renderDetail = (
    label: string,
    value:
      | string
      | number
      | boolean
      | null
      | undefined,
  ) => (
    <View
      key={label}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          color: theme.textSecondary,
          fontSize: 14,
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          color: theme.text,
          fontWeight: "600",
          fontSize: 14,
          textAlign: "right",
          maxWidth: "60%",
        }}
      >
        {typeof value === "boolean"
          ? value
            ? "Enabled"
            : "Disabled"
          : (value ?? "--")}
      </Text>
    </View>
  );

  /**
   * Whether a future plan change
   * has been scheduled.
   */
  const hasScheduledPlan =
    !!subscription?.changeAtRenewal &&
    !!subscription?.nextPlan &&
    subscription.nextPlan !==
      subscription.plan;

  /**
   * Whether the subscription is
   * currently active.
   */
  const isSubscriptionActive =
    subscription?.status === "ACTIVE" &&
    (
      !subscription?.expiresAt ||
      new Date(
        subscription.expiresAt,
      ) > new Date()
    );

  /**
   * Whether the user has an active
   * paid subscription.
   */
  const hasActivePaidPlan =
    isSubscriptionActive &&
    subscription?.plan !== "FREE";

  /**
   * Whether the user previously had
   * a paid plan but no longer has access.
   */
  const hasExpiredPaidPlan =
    subscription?.plan !== "FREE" &&
    !isSubscriptionActive;

  /**
   * Button label.
   *
   * Active paid plan:
   * Change Plan
   *
   * Expired/cancelled/free:
   * Choose Plan
   */
  const planButtonText =
    hasActivePaidPlan
      ? "Change Plan"
      : "Choose Plan";

  /**
   * Cancel subscription.
   */
  const handleCancelSubscription = () => {
    showModal({
      title: "Cancel Subscription",
      message:
        "Would you like to cancel immediately or at the end of your current billing period?",
      type: "warning",
      buttonText: "Keep Subscription",
      secondaryButtonText:
        "End of Billing",
      dangerButtonText: "Cancel Now",

      onSecondaryPress: async () => {
        closeModal();

        try {
          await cancelSubscription(false);

          await fetchSubscription();

          showModal({
            title:
              "Cancellation Scheduled",
            message:
              "Your subscription will remain active until its expiry date.",
            type: "success",
          });
        } catch (err: any) {
          showModal({
            title: "Unable to Cancel",
            message:
              err?.message ??
              "We couldn't cancel your subscription. Please try again.",
            type: "error",
          });
        }
      },

      onDangerPress: async () => {
        closeModal();

        try {
          await cancelSubscription(true);

          await fetchSubscription();

          showModal({
            title:
              "Subscription Cancelled",
            message:
              "Your subscription has been cancelled immediately.",
            type: "success",
          });
        } catch (err: any) {
          showModal({
            title: "Unable to Cancel",
            message:
              err?.message ??
              "We couldn't cancel your subscription. Please try again.",
            type: "error",
          });
        }
      },
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Subscription
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color:
                  theme.textSecondary,
              },
            ]}
          >
            Manage your plan, billing and AI
            generation limits.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={{
              marginTop: 60,
            }}
          />
        ) : (
          <>
            {/* CURRENT PLAN */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card,
                  borderColor:
                    theme.border,
                },
              ]}
            >
              <View
                style={styles.cardHeader}
              >
                <IconSymbol
                  name="CreditCardIcon"
                  size={20}
                  color={theme.primary}
                />

                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  Current Plan
                </Text>
              </View>

              <Text
                style={[
                  styles.planName,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {limits?.name ?? "Free"}
              </Text>

              <Text
                style={[
                  styles.planSubtitle,
                  {
                    color:
                      theme.textSecondary,
                    marginTop: 6,
                  },
                ]}
              >
                {isSubscriptionActive
                  ? "Your subscription is active."
                  : "You're currently using the Free plan."}
              </Text>

              {/* EXPIRED */}
              {hasExpiredPaidPlan &&
                subscription?.status ===
                  "EXPIRED" && (
                  <View
                    style={{
                      marginTop: 16,
                      padding: 12,
                      borderRadius: 10,
                      backgroundColor:
                        theme.background,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          theme.primary,
                        fontWeight:
                          "700",
                      }}
                    >
                      Subscription Expired
                    </Text>

                    <Text
                      style={{
                        color:
                          theme.textSecondary,
                        marginTop: 4,
                        lineHeight: 20,
                      }}
                    >
                      Your{" "}
                      {prettify(
                        subscription.plan,
                      )}{" "}
                      plan expired on{" "}
                      <Text
                        style={{
                          color:
                            theme.text,
                          fontWeight:
                            "700",
                        }}
                      >
                        {formatDate(
                          subscription.expiresAt,
                        )}
                      </Text>
                      . Choose a plan to
                      continue using premium
                      features.
                    </Text>
                  </View>
                )}

              {/* SCHEDULED DOWNGRADE */}
              {hasScheduledPlan &&
                isSubscriptionActive && (
                  <View
                    style={{
                      marginTop: 16,
                      padding: 12,
                      borderRadius: 10,
                      backgroundColor:
                        theme.background,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          theme.primary,
                        fontWeight:
                          "700",
                        marginBottom: 4,
                      }}
                    >
                      Scheduled Plan
                      Change
                    </Text>

                    <Text
                      style={{
                        color:
                          theme.textSecondary,
                        lineHeight: 20,
                      }}
                    >
                      Your subscription
                      will automatically
                      change to{" "}
                      <Text
                        style={{
                          color:
                            theme.text,
                          fontWeight:
                            "700",
                        }}
                      >
                        {
                          subscription?.nextPlan
                        }
                      </Text>{" "}
                      on{" "}
                      <Text
                        style={{
                          color:
                            theme.text,
                          fontWeight:
                            "700",
                        }}
                      >
                        {formatDate(
                          subscription?.expiresAt,
                        )}
                      </Text>
                      .
                    </Text>
                  </View>
                )}

              {/* CANCELLED */}
              {subscription?.status ===
                "CANCELLED" && (
                <View
                  style={{
                    marginTop: 16,
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor:
                      theme.background,
                  }}
                >
                  <Text
                    style={{
                      color: "#DC2626",
                      fontWeight:
                        "700",
                    }}
                  >
                    Subscription
                    Cancelled
                  </Text>

                  <Text
                    style={{
                      color:
                        theme.textSecondary,
                      marginTop: 4,
                      lineHeight: 20,
                    }}
                  >
                    {subscription.cancelledAt
                      ? `Cancelled on ${formatDate(
                          subscription.cancelledAt,
                        )}.`
                      : "Your subscription has been cancelled."}
                  </Text>
                </View>
              )}

              {/* PLAN BUTTONS */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 24,
                }}
              >
                {/*
                 * Always allow the user to
                 * choose a plan unless they
                 * are on PRO and active.
                 *
                 * This means an expired PRO
                 * subscription can still be
                 * renewed.
                 */}
                {!(
                  subscription?.plan ===
                    "PRO" &&
                  isSubscriptionActive
                ) && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      router.push(
                        "/(screen)/subscription/plans",
                      )
                    }
                    style={[
                      styles.button,
                      {
                        flex: 1,
                        backgroundColor:
                          theme.primary,
                        marginRight:
                          hasActivePaidPlan
                            ? 10
                            : 0,
                      },
                    ]}
                  >
                    <Text
                      style={
                        styles.buttonText
                      }
                    >
                      {planButtonText}
                    </Text>
                  </TouchableOpacity>
                )}

                {/* CANCEL */}
                {hasActivePaidPlan && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={
                      handleCancelSubscription
                    }
                    style={[
                      styles.button,
                      {
                        flex: 1,
                        backgroundColor:
                          "#DC2626",
                      },
                    ]}
                  >
                    <Text
                      style={
                        styles.buttonText
                      }
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* SUBSCRIPTION DETAILS */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card,
                  borderColor:
                    theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.text,
                  },
                ]}
              >
                Subscription Details
              </Text>

              {renderDetail(
                "Plan",
                subscription?.plan,
              )}

              {renderDetail(
                "Status",
                subscription?.status,
              )}

              {renderDetail(
                "Billing",
                limits
                  ? `${limits.durationMonths} month${
                      limits.durationMonths >
                      1
                        ? "s"
                        : ""
                    }`
                  : "--",
              )}

              {renderDetail(
                "Price",
                formatCurrency(
                  limits?.price,
                ),
              )}

              {renderDetail(
                "Started",
                formatDate(
                  subscription?.startsAt,
                ),
              )}

              {renderDetail(
                "Expires",
                formatDate(
                  subscription?.expiresAt,
                ),
              )}

              {renderDetail(
                "Auto Renew",
                subscription?.autoRenew,
              )}

              {subscription?.nextPlan &&
                renderDetail(
                  "Scheduled Plan",
                  subscription.nextPlan,
                )}

              {subscription?.changeAtRenewal &&
                renderDetail(
                  "Plan Change",
                  "Will apply at renewal",
                )}

              {renderDetail(
                "Priority",
                limits?.priority,
              )}
            </View>

            {/* USAGE */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card,
                  borderColor:
                    theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.text,
                  },
                ]}
              >
                Monthly Usage
              </Text>

              {renderDetail(
                "Image Generations Used",
                subscription?.usedThisMonth ??
                  0,
              )}

              {renderDetail(
                "Remaining",
                subscription?.remainingGenerations ??
                  "--",
              )}

              {renderDetail(
                "Monthly Limit",
                limits?.limits
                  ?.imageGenerations,
              )}
            </View>

            {/* PLAN LIMITS */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card,
                  borderColor:
                    theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.text,
                  },
                ]}
              >
                Plan Limits
              </Text>

              {renderDetail(
                "Image Generations",
                limits?.limits
                  ?.imageGenerations,
              )}

              {renderDetail(
                "Maximum Resolution",
                limits?.limits
                  ?.maxResolution,
              )}

              {renderDetail(
                "Priority",
                limits?.priority,
              )}
            </View>

            {/* INCLUDED FEATURES */}
            {limits?.features && (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      theme.card,
                    borderColor:
                      theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  Included Features
                </Text>

                {Object.entries(
                  limits.features,
                ).map(
                  ([key, enabled]) => (
                    <View
                      key={key}
                      style={{
                        flexDirection:
                          "row",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        marginBottom: 14,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          color:
                            theme.text,
                          textTransform:
                            "capitalize",
                        }}
                      >
                        {key
                          .replace(
                            /([A-Z])/g,
                            " $1",
                          )
                          .trim()}
                      </Text>

                      <IconSymbol
                        name={
                          enabled
                            ? "CheckCircleIcon"
                            : "XCircleIcon"
                        }
                        size={18}
                        color={
                          enabled
                            ? theme.emerald
                            : theme.textSecondary
                        }
                      />
                    </View>
                  ),
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* FEEDBACK MODAL
          Still useful for actions/errors,
          but not used for the expiration
          notice anymore. */}
      <FeedbackModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        buttonText={modal.buttonText}
        secondaryButtonText={
          modal.secondaryButtonText
        }
        dangerButtonText={
          modal.dangerButtonText
        }
        onClose={closeModal}
        onSecondaryPress={
          modal.onSecondaryPress
        }
        onDangerPress={
          modal.onDangerPress
        }
      />
    </SafeAreaView>
  );
}