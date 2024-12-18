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
    "PushNotifications": {
        "presentationOptions": ["badge", "sound", "alert"]
    }

  }
};

export default config;
