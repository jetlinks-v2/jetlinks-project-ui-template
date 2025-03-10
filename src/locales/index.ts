import { createI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n';
import {langKey} from "@/utils/consts";
import { getLang } from '@/utils/modules'

const mainModules = import.meta.glob('./lang/*.json', {eager: true})
const modules = getLang()

const allModules = Object.assign({}, mainModules, modules)

function loadLocalesMapFromDir(regexp: RegExp, modules: Record<string, any>) {
  const localesRaw: Record<Locale, Record<string, () => Promise<unknown>>> = {};
  for (const path in modules) {
    const match = path.match(regexp);
    if (match) {
      const [_, locale] = match;
      if (locale) {
        if (!localesRaw[locale]) {
          localesRaw[locale] = {};
        }
        if (modules[path]) {
          localesRaw[locale] = Object.assign(localesRaw[locale], modules[path]?.default);
        }
      }
    }
  }
  // Convert raw locale data into async import functions

  return localesRaw;
}
const messages = loadLocalesMapFromDir(/([^/]*)\.json$/, allModules);

const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言

const i18n = createI18n({
  legacy: false,
  silentTranslationWarn: true,
  locale: localStorage.getItem(langKey) || language.split('-')[0] || 'en',
  fallbackLocale: language,
  messages,
})

export default i18n
