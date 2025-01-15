import { LanguageKey } from "@/components/Main";
import { LANGUAGE_FILE_EXTENSIONS } from "@/constants";

export const getLanguageByExtension = (extension: string): LanguageKey => {
  return Object.keys(LANGUAGE_FILE_EXTENSIONS).find(
    (key) => LANGUAGE_FILE_EXTENSIONS[key as LanguageKey] === extension
  ) as LanguageKey;
};
