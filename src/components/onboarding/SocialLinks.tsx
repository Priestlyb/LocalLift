import React from "react";
import { View } from "react-native";

import BrandTextField from "./BrandTextField";

interface SocialLinksProps {
  facebook: string;
  instagram: string;
  x: string;
  linkedin: string;
  tiktok: string;

  setFacebook: (text: string) => void;
  setInstagram: (text: string) => void;
  setX: (text: string) => void;
  setLinkedin: (text: string) => void;
  setTiktok: (text: string) => void;
}

function SocialLinks({
  facebook,
  instagram,
  x,
  linkedin,
  tiktok,

  setFacebook,
  setInstagram,
  setX,
  setLinkedin,
  setTiktok,
}: SocialLinksProps) {
  return (
    <View>
      <BrandTextField
        label="Facebook"
        icon="FacebookIcon"
        value={facebook}
        onChangeText={setFacebook}
        autoCapitalize="none"
        placeholder="facebook.com/yourbusiness"
        keyboardType="url"
      />

      <BrandTextField
        label="Instagram"
        icon="InstagramIcon"
        value={instagram}
        onChangeText={setInstagram}
        autoCapitalize="none"
        placeholder="@yourbusiness"
      />

      <BrandTextField
        label="X (Twitter)"
        icon="XIcon"
        value={x}
        onChangeText={setX}
        autoCapitalize="none"
        placeholder="@yourbusiness"
      />

      <BrandTextField
        label="LinkedIn"
        icon="LinkedinIcon"
        value={linkedin}
        onChangeText={setLinkedin}
        autoCapitalize="none"
        placeholder="linkedin.com/company/yourbusiness"
        keyboardType="url"
      />

      <BrandTextField
        label="TikTok"
        icon="TikTokIcon"
        value={tiktok}
        onChangeText={setTiktok}
        autoCapitalize="none"
        placeholder="@yourbusiness"
      />
    </View>
  );
}

export default React.memo(SocialLinks);
