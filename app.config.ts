import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Movies-inc",
  slug: "Movies-inc",
  plugins: [
      [
        "@sentry/react-native/expo",
        {
          organization: process.env.EXPO_PUBLIC_SENTRY_ORG,
          project: process.env.EXPO_PUBLIC_SENTRY_PROJECT,
          url: "https://sentry.io/"
        }
      ]
    ]
});