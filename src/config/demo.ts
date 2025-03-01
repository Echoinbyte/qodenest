// const isMonacoConfigured = useRef(false); // Prevent reinitialization

//   useEffect(() => {
//     if (isMonacoConfigured.current) return; // Skip if already initialized

//     loader.init().then((monaco) => {
//       // Register the language
//       monaco.languages.register(languageExtensionPoint);

//       // Set the Monarch tokenizer
//       monaco.languages.setMonarchTokensProvider(
//         languageExtensionPoint.id,
//         languageType
//       );

//       // Set the language configuration
//       monaco.languages.setLanguageConfiguration(
//         languageExtensionPoint.id,
//         languageConfiguration
//       );

//       // Maps to track user-defined variables, functions, and subroutines
//       const userDefinedVariables = new Map<string, string>(); // Preserve original casing
//       const userDefinedProcedures = new Map<string, string>(); // Preserve original casing for functions and subroutines

//       // Register a completion item provider for Qbasics
//       monaco.languages.registerCompletionItemProvider(
//         languageExtensionPoint.id,
//         {
//           triggerCharacters: [".", "\n", " "], // Optional, suggestions appear after a space
//           provideCompletionItems: async (model, position) => {
//             const word = model.getWordUntilPosition(position);
//             const range = {
//               startLineNumber: position.lineNumber,
//               endLineNumber: position.lineNumber,
//               startColumn: word.startColumn,
//               endColumn: word.endColumn,
//             };
//             const textBeforeCursor = model.getValueInRange({
//               startLineNumber: position.lineNumber,
//               endLineNumber: position.lineNumber,
//               startColumn: 0,
//               endColumn: position.column,
//             });
//             const variableDeclarationRegex = /\b(DIM|LET)\s+(\w+)/g;
//             const procedureDeclarationRegex = /\b(FUNCTION|SUB)\s+(\w+)/g;
//             let match;
//             while (
//               (match = variableDeclarationRegex.exec(textBeforeCursor)) !== null
//             ) {
//               userDefinedVariables.set(match[2], match[2]); // Store exact casing
//             }
//             while (
//               (match = procedureDeclarationRegex.exec(textBeforeCursor)) !==
//               null
//             ) {
//               userDefinedProcedures.set(match[2], match[2]); // Store exact casing
//             }

//             const suggestions = Keywords.map((keyword) => ({
//               label: keyword,
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: keyword,
//               detail: `QBasic Keyword: ${keyword}`, // Additional description
//               documentation: `This is the ${keyword} keyword used in QBasic.`,
//               range,
//             }));

//             const snippets = [
//               {
//                 label: "if-then",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "IF ${1:condition} THEN\n\t${2:statements}\nEND IF",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "If-Then block",
//                 documentation: "Creates an If-Then conditional block.",
//               },
//               {
//                 label: "for-next",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "FOR ${1:variable} = ${2:start} TO ${3:end}\n\t${4:statements}\nNEXT ${1:variable}",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "For-Next Loop",
//                 documentation:
//                   "Creates a For-Next loop to iterate over a range of values.",
//               },
//               {
//                 label: "do-while",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "DO WHILE ${1:condition}\n\t${2:statements}\nLOOP",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Do-While Loop",
//                 documentation:
//                   "Creates a Do-While loop that runs while a condition is true.",
//               },
//               {
//                 label: "do-until",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "DO UNTIL ${1:condition}\n\t${2:statements}\nLOOP",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Do-Until Loop",
//                 documentation:
//                   "Creates a Do-Until loop that runs until a condition becomes true.",
//               },
//               {
//                 label: "select-case",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "SELECT CASE ${1:variable}\n\tCASE ${2:value1}\n\t\t${3:statements1}\n\tCASE ${4:value2}\n\t\t${5:statements2}\n\tCASE ELSE\n\t\t${6:default_statements}\nEND SELECT",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Select Case",
//                 documentation:
//                   "Creates a Select Case block for multi-branch decision-making.",
//               },
//               {
//                 label: "function",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "FUNCTION ${1:function_name}(${2:arguments})\n\t${3:statements}\nEND FUNCTION",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Function Definition",
//                 documentation:
//                   "Defines a reusable function with optional arguments.",
//               },
//               {
//                 label: "sub",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "SUB ${1:sub_name}(${2:arguments})\n\t${3:statements}\nEND SUB",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Subroutine Definition",
//                 documentation:
//                   "Defines a reusable subroutine with optional arguments.",
//               },
//               {
//                 label: "input",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: 'INPUT "${1:Enter your input:} "; ${2:variable}',
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Input",
//                 documentation:
//                   "Prompts for user input and stores it in a variable.",
//               },
//               {
//                 label: "print",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: 'PRINT "${1:The output is:} "; ${2:variable}',
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Print",
//                 documentation: "Prints the text and variable.",
//               },
//               {
//                 label: "declare-function",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "DECLARE FUNCTION ${1:function_name} (${2:arguments})",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Declare Function",
//                 documentation: "Declares a function with arguments.",
//               },
//               {
//                 label: "declare-sub",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "DECLARE SUB ${1:sub_name} (${2:arguments})",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Declare Sub",
//                 documentation: "Declares a subroutine with optional arguments.",
//               },
//               {
//                 label: "let",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "LET ${1:variable} = ${2:value}",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Let Statement",
//                 documentation: "Assigns a value to a variable.",
//               },
//               {
//                 label: "open-file-read",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   'OPEN "${1:file_path}" FOR INPUT AS ${2:#file_number}\n\t${3:statements}\nCLOSE ${2:#file_number}',
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Open File for Reading",
//                 documentation:
//                   "Opens a file for reading and closes it after use.",
//               },
//               {
//                 label: "open-file-write",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   'OPEN "${1:file_path}" FOR OUTPUT AS ${2:#file_number}\n\t${3:statements}\nCLOSE ${2:#file_number}',
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Open File for Writing",
//                 documentation:
//                   "Opens a file for writing and closes it after use.",
//               },
//               {
//                 label: "randomize",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText:
//                   "RANDOMIZE TIMER\n${1:variable} = INT(RND * ${2:max_value}) + ${3:min_value}",
//                 insertTextRules:
//                   monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Randomize Timer",
//                 documentation:
//                   "Seeds the random number generator and generates a random number.",
//               },
//             ];

//             // Add user-defined variables to suggestions (preserve casing)
//             const variableSuggestions = Array.from(
//               userDefinedVariables.values()
//             ).map((variable) => ({
//               label: variable,
//               kind: monaco.languages.CompletionItemKind.Variable,
//               insertText: variable,
//               detail: `User-defined variable: ${variable}`,
//               documentation: `A user-defined variable in the current scope.`,
//               range,
//             }));

//             // Add user-defined functions and subroutines to suggestions (merged logic, preserve casing)
//             const procedureSuggestions = Array.from(
//               userDefinedProcedures.values()
//             ).map((proc) => ({
//               label: proc,
//               kind: monaco.languages.CompletionItemKind.Function,
//               insertText: `${proc}()`,
//               detail: `User-defined procedure: ${proc}`,
//               documentation: `A user-defined procedure (either a function or subroutine) in the current scope.`,
//               range,
//             }));

//             return {
//               suggestions: [
//                 ...suggestions,
//                 ...snippets,
//                 ...variableSuggestions,
//                 ...procedureSuggestions, // Merged functions and subs
//               ].filter((item) => {
//                 const seen = new Set();
//                 return !seen.has(item.label) && seen.add(item.label);
//               }),
//             } as any;
//           },
//         }
//       );

//       // Register a completion item provider for Java
//       monaco.languages.registerCompletionItemProvider("java", {
//         triggerCharacters: [".", "\n", " "], // Optional, suggestions appear after a space
//         provideCompletionItems: async (model, position) => {

//           return {
//             suggestions: [
//               {
//                 label: "System.out.println",
//                 kind: monaco.languages.CompletionItemKind.Snippet,
//                 insertText: "System.out.println(${1:expression});",
//                 insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                 detail: "Prints to the console",
//                 documentation: "Prints the expression to the console.",
//                 range: {
//                   startLineNumber: position.lineNumber,
//                   endLineNumber: position.lineNumber,
//                   startColumn: position.column,
//                   endColumn: position.column,
//                 },
//               },
//             ],
//           }
//         }
//       })


//       isMonacoConfigured.current = true; // Mark as configured
//     });
//   }, []);