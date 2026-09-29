import React, { memo } from "react";
import { View, Text, ScrollView } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import {
  BusinessSectionProps,
  BusinessInfoSectionProps,
} from "@/types/business";

import { SectionHeader } from "@/components/business-settings/SectionHeader";
import { FormInput } from "@/components/business-settings/FormInput";
import { ChipSelector } from "@/components/business-settings/ChipSelector";

function BusinessInfoSectionComponent({
  business,
  updateField,
  categories,
  toneOptions,
}: BusinessInfoSectionProps) {
  const theme = useTheme();

  return (
    <>
      <SectionHeader
        title="Business Information"
        subtitle="Basic details about your business."
      />

      <FormInput
        label="Business Name"
        field="name"
        value={business.name}
        placeholder="e.g. Fresh Bites Bakery"
        onChange={updateField}
      />

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            color: theme.text,
            marginBottom: 8,
            fontWeight: "600",
          }}
        >
          Business Category
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ paddingRight: 20 }}>
            <ChipSelector
              options={categories}
              value={business.category}
              field="category"
              activeColor={theme.primary}
              onChange={updateField}
            />
          </View>
        </ScrollView>
      </View>

      <FormInput
        label="Business Description"
        field="description"
        value={business.description}
        placeholder="Describe your business, products, or services."
        multiline
        onChange={updateField}
      />

      <FormInput
        label="Unique Selling Point"
        field="uniqueSellingPoint"
        value={business.uniqueSellingPoint}
        placeholder="What makes your business different?"
        onChange={updateField}
      />

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            color: theme.text,
            marginBottom: 8,
            fontWeight: "600",
          }}
        >
          Brand Tone
        </Text>

        <ChipSelector
          options={toneOptions}
          value={business.tone}
          field="tone"
          activeColor={theme.emerald}
          onChange={updateField}
        />
      </View>

      <FormInput
        label="Target Audience"
        field="audience"
        value={business.audience}
        placeholder="e.g. Students, Families, Professionals"
        onChange={updateField}
      />
    </>
  );
}

export const BusinessInfoSection = memo(BusinessInfoSectionComponent);
