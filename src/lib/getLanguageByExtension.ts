import { LANGUAGE_DATA, LanguageKey } from "@/constants";

export const getLanguageByExtension = (
  extension: string
): LanguageKey => {
  return Object.keys(LANGUAGE_DATA).find(
    (key) => LANGUAGE_DATA[key as LanguageKey].extension === extension
  ) as LanguageKey;
};
