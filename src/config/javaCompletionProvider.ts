export const registerJavaCompletionProvider = (monaco: any) => {
  monaco.languages.registerCompletionItemProvider("java", {
    triggerCharacters: [".", "\n", " "],
    provideCompletionItems: async () => ({
      suggestions: [
        {
          label: "System.out.println",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "System.out.println(${1:expression});",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Prints to the console",
          documentation: "Prints the expression to the console.",
        },
      ],
    }),
  });
};
