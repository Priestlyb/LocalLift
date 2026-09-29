import React, { memo } from "react";

import { BusinessSectionProps } from "@/types/business";
import { FormInput } from "@/components/business-settings/FormInput";
import { SectionHeader } from "@/components/business-settings/SectionHeader";

function ContactSectionComponent({
  business,
  updateField,
}: BusinessSectionProps) {
  return (
    <>
      <SectionHeader
        title="Contact Information"
        subtitle="How customers can reach your business."
      />

      <FormInput
        label="Phone Number"
        field="phone"
        value={business.phone}
        placeholder="e.g. +2348012345678"
        keyboardType="phone-pad"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="Email Address"
        field="email"
        value={business.email}
        placeholder="business@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="Website"
        field="website"
        value={business.website}
        placeholder="https://www.example.com"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />
    </>
  );
}

export const ContactSection = memo(ContactSectionComponent);
