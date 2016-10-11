/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);

export const appLocales = [
  'en',
  'es'
];

export const appLocalesMessages = {
  'en':'talo.components.LanguageProvider.eng',
  'es':'talo.components.LanguageProvider.es'
};

import enTranslationMessages from './translations/en.json';
import esTranslationMessages from './translations/es.json';

export const formatTranslationMessages = (messages) => {
  const formattedMessages = {};
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage;
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  es: formatTranslationMessages(esTranslationMessages),
};
