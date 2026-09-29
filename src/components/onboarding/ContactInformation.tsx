import React from "react";
import { View } from "react-native";

import BrandTextField from "./BrandTextField";

interface ContactInformationProps {
  phone: string;
  email: string;
  website: string;

  address: string;
  city: string;
  state: string;
  country: string;

  setPhone: (text: string) => void;
  setEmail: (text: string) => void;
  setWebsite: (text: string) => void;

  setAddress: (text: string) => void;
  setCity: (text: string) => void;
  setState: (text: string) => void;
  setCountry: (text: string) => void;
}

function ContactInformation({
  phone,
  email,
  website,

  address,
  city,
  state,
  country,

  setPhone,
  setEmail,
  setWebsite,

  setAddress,
  setCity,
  setState,
  setCountry,
}: ContactInformationProps) {
  return (
    <View>
      <BrandTextField
        label="Business Phone"
        icon="PhoneIcon"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="+234 801 234 5678"
      />

      <BrandTextField
        label="Business Email"
        icon="MailIcon"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="hello@yourbusiness.com"
      />

      <BrandTextField
        label="Website"
        icon="GlobeIcon"
        value={website}
        onChangeText={setWebsite}
        autoCapitalize="none"
        placeholder="https://yourbusiness.com"
      />

      <BrandTextField
        label="Street Address"
        icon="LocationDotIcon"
        value={address}
        onChangeText={setAddress}
        placeholder="12 Adetokunbo Ademola Crescent"
      />

      <BrandTextField
        label="City"
        icon="BuildingIcon"
        value={city}
        onChangeText={setCity}
        placeholder="Abuja"
      />

      <BrandTextField
        label="State"
        icon="MapIcon"
        value={state}
        onChangeText={setState}
        placeholder="Federal Capital Territory"
      />

      <BrandTextField
        label="Country"
        icon="GlobeIcon"
        value={country}
        onChangeText={setCountry}
        placeholder="Nigeria"
      />
    </View>
  );
}

export default React.memo(ContactInformation);
