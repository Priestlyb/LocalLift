import React, { memo } from "react";

import { BusinessSectionProps } from "@/types/business";
import { FormInput } from "@/components/business-settings/FormInput";
import { SectionHeader } from "@/components/business-settings/SectionHeader";

function SocialSectionComponent({
  business,
  updateField,
}: BusinessSectionProps) {
  return (
    <>
      <SectionHeader
        title="Social Media"
        subtitle="Connect your social media accounts to strengthen your brand."
      />

      <FormInput
        label="Facebook"
        field="facebook"
        value={business.facebook}
        placeholder="https://facebook.com/yourpage"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="Instagram"
        field="instagram"
        value={business.instagram}
        placeholder="https://instagram.com/yourusername"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="LinkedIn"
        field="linkedin"
        value={business.linkedin}
        placeholder="https://linkedin.com/company/yourcompany"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="TikTok"
        field="tiktok"
        value={business.tiktok}
        placeholder="https://tiktok.com/@yourusername"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />

      <FormInput
        label="X (Twitter)"
        field="x"
        value={business.x}
        placeholder="https://x.com/yourusername"
        keyboardType="url"
        autoCapitalize="none"
        onChange={updateField}
      />
    </>
  );
}

export const SocialSection = memo(SocialSectionComponent);
