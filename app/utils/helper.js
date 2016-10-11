
import _ from 'lodash';

export function Option(ifNotNull, ifNull){

  if(!_.isEmpty(ifNotNull)) return ifNotNull;

  return ifNull;
}

export function getLangItems(appLocales, locale){
  return Object.keys(appLocales)
    .map(lang => ({value:lang, title: appLocales[lang], marked: lang === locale}));
}
