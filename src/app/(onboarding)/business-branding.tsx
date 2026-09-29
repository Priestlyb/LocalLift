import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { IconSymbol } from "@/constants/icons/icon-symbol";
import { useTheme } from "@/hooks/useTheme";
import { businessBrandingStyles as styles } from "@/styles/business-branding.styles";
import { useOnboardingStore } from "@/store/onboardingStore";

import ProgressHeader from "@/components/onboarding/ProgressHeader";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import AITipCard from "@/components/onboarding/AITipCard";
import BrandTextField from "@/components/onboarding/BrandTextField";
import BrandTextArea from "@/components/onboarding/BrandTextArea";
import BrandVoiceSelector from "@/components/onboarding/BrandVoiceSelector";
import LogoUploader from "@/components/onboarding/LogoUploader";
import ContinueButton from "@/components/onboarding/ContinueButton";
import ContactInformation from "@/components/onboarding/ContactInformation";
import SocialLinks from "@/components/onboarding/SocialLinks";

const BRAND_VOICES = [
  "Professional",
  "Friendly",
  "Luxury",
  "Playful",
  "Modern",
  "Bold",
];

const STORAGE_KEY = "onboarding";

export default function BusinessBrandingScreen() {
  const theme = useTheme();

  const category = useOnboardingStore((state) => state.category);
  const setData = useOnboardingStore((state) => state.setData);

  // Business Details
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState("");
  const [brandVoice, setBrandVoice] = useState("");

  // Contact Information
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");

  // Branding
  const [logo, setLogo] = useState<string>();
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");

  // Social Media
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [x, setX] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tiktok, setTiktok] = useState("");

  const normalizeWebsite = (value: string): string => {
    const website = value.trim();

    if (!website) return "";

    if (!/^https?:\/\//i.test(website)) {
      return `https://${website}`;
    }

    return website;
  };

  const isValidWebsite = (value: string): boolean => {
    const website = value.trim();

    // Website is optional
    if (!website) return true;

    try {
      const normalized = normalizeWebsite(website);
      const url = new URL(normalized);

      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        !!url.hostname &&
        url.hostname.includes(".")
      );
    } catch {
      return false;
    }
  };

  /**
   * Fields that are required before continuing.
   *
   * Keep this in one place so the validation
   * and the UI stay synchronized.
   */
  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    if (!businessName.trim()) {
      errors.push("Business Name");
    }

    if (!description.trim()) {
      errors.push("Business Description");
    }

    if (!targetAudience.trim()) {
      errors.push("Target Audience");
    }

    if (!uniqueSellingPoint.trim()) {
      errors.push("Unique Selling Point");
    }

    if (!brandVoice.trim()) {
      errors.push("Brand Voice");
    }

    if (!city.trim()) {
      errors.push("City");
    }

    if (!isValidWebsite(website)) {
      errors.push("Valid Website URL");
    }

    return errors;
  }, [
    businessName,
    description,
    targetAudience,
    uniqueSellingPoint,
    brandVoice,
    city,
    website,
  ]);

  const isValid = validationErrors.length === 0;

  useEffect(() => {
    loadOnboarding();
  }, []);

  useEffect(() => {
    saveOnboarding();
  }, [
    category,

    businessName,
    description,
    targetAudience,
    uniqueSellingPoint,
    brandVoice,

    phone,
    email,
    website,

    address,
    city,
    state,
    country,

    logo,
    primaryColor,
    secondaryColor,

    facebook,
    instagram,
    x,
    linkedin,
    tiktok,
  ]);

  const loadOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (!value) return;

      const data = JSON.parse(value);

      setBusinessName(data.businessName ?? "");
      setDescription(data.description ?? "");
      setTargetAudience(data.targetAudience ?? "");
      setUniqueSellingPoint(data.uniqueSellingPoint ?? "");
      setBrandVoice(data.brandVoice ?? "");

      setPhone(data.phone ?? "");
      setEmail(data.email ?? "");
      setWebsite(data.website ?? "");

      setAddress(data.address ?? "");
      setCity(data.city ?? "");
      setState(data.state ?? "");
      setCountry(data.country ?? "Nigeria");

      setLogo(data.logo);
      setPrimaryColor(data.primaryColor ?? "#000000");
      setSecondaryColor(data.secondaryColor ?? "#FFFFFF");

      setFacebook(data.facebook ?? "");
      setInstagram(data.instagram ?? "");
      setX(data.x ?? "");
      setLinkedin(data.linkedin ?? "");
      setTiktok(data.tiktok ?? "");

      setData({
        category: data.category ?? "",

        businessName: data.businessName ?? "",
        description: data.description ?? "",
        targetAudience: data.targetAudience ?? "",
        uniqueSellingPoint: data.uniqueSellingPoint ?? "",
        brandVoice: data.brandVoice ?? "",

        phone: data.phone ?? "",
        email: data.email ?? "",
        website: data.website ?? "",

        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        country: data.country ?? "Nigeria",

        logo: data.logo,

        primaryColor: data.primaryColor ?? "#000000",
        secondaryColor: data.secondaryColor ?? "#FFFFFF",

        facebook: data.facebook ?? "",
        instagram: data.instagram ?? "",
        x: data.x ?? "",
        linkedin: data.linkedin ?? "",
        tiktok: data.tiktok ?? "",
      });
    } catch (error) {
      console.log("[LOAD ONBOARDING]", error);
    }
  };

  const saveOnboarding = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          category,

          businessName,
          description,
          targetAudience,
          uniqueSellingPoint,
          brandVoice,

          phone,
          email,
          website,

          address,
          city,
          state,
          country,

          logo,
          primaryColor,
          secondaryColor,

          facebook,
          instagram,
          x,
          linkedin,
          tiktok,
        }),
      );
    } catch (error) {
      console.log("[SAVE ONBOARDING]", error);
    }
  };

  const handleContinue = () => {
    // Extra protection in case this function is triggered
    // programmatically while the form is invalid.
    if (!isValid) {
      return;
    }

    const normalizedWebsite = normalizeWebsite(website);

    const onboardingData = {
      category,

      businessName: businessName.trim(),
      description: description.trim(),
      targetAudience: targetAudience.trim(),
      uniqueSellingPoint: uniqueSellingPoint.trim(),
      brandVoice: brandVoice.trim(),

      phone: phone.trim(),
      email: email.trim(),
      website: normalizedWebsite,

      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),

      logo,
      primaryColor,
      secondaryColor,

      facebook: facebook.trim(),
      instagram: instagram.trim(),
      x: x.trim(),
      linkedin: linkedin.trim(),
      tiktok: tiktok.trim(),
    };

    setData(onboardingData);

    if (!category) {
      router.replace("/(onboarding)/business-category");
      return;
    }

    router.push("/(onboarding)/register");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="ChevronLeft" size={20} color={theme.text} />
          </TouchableOpacity>

          <ProgressHeader step={2} totalSteps={3} />

          <OnboardingHeader
            title="Tell us about your brand"
            subtitle="LocalLift uses this information to generate marketing content that matches your business."
          />

          <AITipCard
            title="Better answers = Better AI Content"
            description="The more details you provide, the more personalized your social posts, WhatsApp campaigns, flyers, and email marketing content will be."
          />

          <BrandTextField
            label="Business Name"
            icon="BuildingIcon"
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="e.g. Priestly Fashion Hub"
          />

          <BrandTextArea
            label="Business Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what your business offers. Example: Premium fashion store offering modern and traditional clothing for men and women."
          />

          <BrandTextArea
            label="Target Audience"
            value={targetAudience}
            onChangeText={setTargetAudience}
            placeholder="Who are your ideal customers? Example: Young professionals, students, families, business owners..."
          />

          <BrandTextArea
            label="Unique Selling Point"
            value={uniqueSellingPoint}
            onChangeText={setUniqueSellingPoint}
            placeholder="What makes your business different? Example: Affordable premium fashion delivered nationwide."
          />

          <BrandVoiceSelector
            voices={BRAND_VOICES}
            value={brandVoice}
            onChange={setBrandVoice}
          />

          <ContactInformation
            phone={phone}
            email={email}
            website={website}
            address={address}
            city={city}
            state={state}
            country={country}
            setPhone={setPhone}
            setEmail={setEmail}
            setWebsite={setWebsite}
            setAddress={setAddress}
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />

          <BrandTextField
            label="Business Address"
            icon="LocationDotIcon"
            value={address}
            onChangeText={setAddress}
            placeholder="e.g. 12 Main Street"
          />

          <BrandTextField
            label="City"
            icon="LocationDotIcon"
            value={city}
            onChangeText={setCity}
            placeholder="e.g. Abuja"
          />

          <BrandTextField
            label="State"
            icon="LocationDotIcon"
            value={state}
            onChangeText={setState}
            placeholder="e.g. FCT"
          />

          <BrandTextField
            label="Country"
            icon="LocationDotIcon"
            value={country}
            onChangeText={setCountry}
            placeholder="e.g. Nigeria"
          />

          <LogoUploader value={logo} onChange={setLogo} />

          <SocialLinks
            facebook={facebook}
            instagram={instagram}
            x={x}
            linkedin={linkedin}
            tiktok={tiktok}
            setFacebook={setFacebook}
            setInstagram={setInstagram}
            setX={setX}
            setLinkedin={setLinkedin}
            setTiktok={setTiktok}
          />
        </ScrollView>

        <View
          style={[
            styles.footer,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          {!isValid && (
            <View
              style={{
                marginBottom: 10,
                padding: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <IconSymbol name="WarningIcon" size={16} color={theme.error} />

                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 13,
                    fontWeight: "600",
                    color: theme.error,
                  }}
                >
                  Please complete the following:
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {validationErrors.map((error) => (
                  <View
                    key={error}
                    style={{
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                      borderRadius: 8,
                      backgroundColor: `${theme.error}12`,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.error,
                        fontWeight: "500",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <ContinueButton disabled={!isValid} onPress={handleContinue} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
