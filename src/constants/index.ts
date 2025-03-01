export type LanguageKey =
  | "qb"
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "csharp"
  | "php"
  | "c"
  | "cpp"
  | "";

export interface LanguageData {
  name: string;
  code_snippets: string;
  extension: string;
  version: string;
  image: string; // New property for the image
}

export const LANGUAGE_DATA: Record<LanguageKey, LanguageData> = {
  qb: {
    name: "Qbasic",
    code_snippets: `PRINT "Hello, World!"`,
    extension: ".bas",
    version: "1.0.0",
    image: "/preview/qbasic.png", // Replace with the actual image path
  },
  javascript: {
    name: "JavaScript",
    code_snippets: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Sambhav");\n`,
    extension: ".js",
    version: "18.15.0",
    image: "/preview/javascript.png", // Replace with the actual image path
  },
  typescript: {
    name: "TypeScript",
    code_snippets: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Sambhav" });\n`,
    extension: ".ts",
    version: "5.0.3",
    image: "/preview/typescript.png", // Replace with the actual image path
  },
  python: {
    name: "Python",
    code_snippets: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Sambhav")\n`,
    extension: ".py",
    version: "3.10.0",
    image: "/preview/python.png", // Replace with the actual image path
  },
  java: {
    name: "Java",
    code_snippets: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    extension: ".java",
    version: "15.0.2",
    image: "/preview/java.png", // Replace with the actual image path
  },
  csharp: {
    name: "C#",
    code_snippets: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
    extension: ".cs",
    version: "6.12.0",
    image: "/preview/csharp.png", // Replace with the actual image path
  },
  php: {
    name: "PHP",
    code_snippets: `<?php\n\n$name = 'Sambhav';\necho $name;\n`,
    extension: ".php",
    version: "8.2.3",
    image: "/preview/php.png", // Replace with the actual image path
  },
  c: {
    name: "C",
    code_snippets: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
    extension: ".c",
    version: "11.2.0",
    image: "/preview/c.png", // Replace with the actual image path
  },
  cpp: {
    name: "C++",
    code_snippets: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}\n`,
    extension: ".cpp",
    version: "20.0.0",
    image: "/preview/cpp.png", // Replace with the actual image path
  },
  "": {
    name: "Unknown",
    code_snippets: "",
    extension: "",
    version: "",
    image: "/preview/c.png", // Default image for unknown languages
  },
};
