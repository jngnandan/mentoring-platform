// src/components/CookieConsentBanner.js
import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => (
  <CookieConsent
    location="bottom"
    buttonText="I accept"
    cookieName="cookieConsent"
    style={{ background: "#2B2B2B", color: "#fff" }}
    buttonStyle={{ color: "#fff", background: "#000" }}
    expires={365}
  >
    This website uses cookies to enhance the user experience. 
    <a href="/privacy-policy" style={{ color: "#4B9CD3" }}> Learn more</a>
  </CookieConsent>
);

export default CookieConsentBanner;
