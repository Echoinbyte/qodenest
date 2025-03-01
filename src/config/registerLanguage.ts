import {
  languageConfiguration,
  languageExtensionPoint,
  languageType,
} from "@/language/customLanguageConfig";

export const registerQBasicLanguage = (monaco: any) => {
  monaco.languages.register(languageExtensionPoint);
  monaco.languages.setMonarchTokensProvider(
    languageExtensionPoint.id,
    languageType
  );
  monaco.languages.setLanguageConfiguration(
    languageExtensionPoint.id,
    languageConfiguration
  );
};
