type LanguageKey =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "php";

export const LANGUAGE_VERSIONS: Record<LanguageKey, string> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const LANGUAGE_FILE_EXTENSIONS: Record<LanguageKey, string> = {
  javascript: ".js",
  typescript: ".ts",
  python: ".py",
  java: ".java",
  csharp: ".cs",
  php: ".php",
};

export const CODE_SNIPPETS: Record<LanguageKey, string> = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Sambhav");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Sambhav" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Sambhav")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Sambhav';\necho $name;\n",
};
