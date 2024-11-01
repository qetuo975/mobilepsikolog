import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'therapydays.ionic.starter',
  appName: 'mobilepsikolog',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true, // Bu, HTTP isteklerine izin verir.
  },
  android: {
    allowMixedContent: true // Mixed content'i etkinleştirir
  },
  plugins: {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "888583782126-4s8kfffueh35h9deudgvfct4v0gkt35i.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    },
    "PushNotifications": {
        "presentationOptions": ["badge", "sound", "alert"]
    }

  }
};

export default config;
