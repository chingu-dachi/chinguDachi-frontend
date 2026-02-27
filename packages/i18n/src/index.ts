import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import koCommon from './locales/ko/common.json';
import koAuth from './locales/ko/auth.json';
import koChat from './locales/ko/chat.json';
import koProfile from './locales/ko/profile.json';

import jaCommon from './locales/ja/common.json';
import jaAuth from './locales/ja/auth.json';
import jaChat from './locales/ja/chat.json';
import jaProfile from './locales/ja/profile.json';

export const defaultNS = 'common';

export const resources = {
  ko: {
    common: koCommon,
    auth: koAuth,
    chat: koChat,
    profile: koProfile,
  },
  ja: {
    common: jaCommon,
    auth: jaAuth,
    chat: jaChat,
    profile: jaProfile,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
