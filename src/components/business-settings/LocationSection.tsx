import React, { memo } from "react";

import { BusinessSectionProps } from "@/types/business";
import { FormInput } from "@/components/business-settings/FormInput";
import { SectionHeader } from "@/components/business-settings/SectionHeader";

function LocationSectionComponent({
  business,
  updateField,
}: BusinessSectionProps) {
  return (
    <>
      <SectionHeader
        title="Location"
        subtitle="Where your business is located."
      />

      <FormInput
        label="Address"
        field="address"
        value={business.address}
        placeholder="Street address"
        onChange={updateField}
      />

      <FormInput
        label="City"
        field="city"
        value={business.city}
        placeholder="City"
        onChange={updateField}
      />

      <FormInput
        label="State"
        field="state"
        value={business.state}
        placeholder="State"
        onChange={updateField}
      />

      <FormInput
        label="Country"
        field="country"
        value={business.country}
        placeholder="Country"
        onChange={updateField}
      />
    </>
  );
}

export const LocationSection = memo(LocationSectionComponent);
