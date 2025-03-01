// const TokenType = {
//   KEYWORD: "KEYWORD",
//   IDENTIFIER: "IDENTIFIER",
//   NUMBER: "NUMBER",
//   STRING: "STRING",
//   OPERATOR: "OPERATOR",
//   SEPARATOR: "SEPARATOR",
//   COMMENT: "COMMENT",
//   WHITESPACE: "WHITESPACE",
//   EOF: "EOF",
// };

// const Keywords = new Set([
//   "PRINT",
//   "INPUT",
//   "IF",
//   "THEN",
//   "ELSE",
//   "ENDIF",
//   "FOR",
//   "TO",
//   "NEXT",
//   "WHILE",
//   "WEND",
//   "DO",
//   "LOOP",
//   "FUNCTION",
//   "SUB",
//   "END",
//   "DIM",
//   "LET",
//   "GOSUB",
//   "GOTO",
//   "RETURN",
//   "CALL",
//   "EXIT",
//   "SELECT",
//   "CASE",
//   "RANDOMIZE",
//   "ON",
//   "ERROR",
//   "RESUME",
//   "READ",
//   "DATA",
//   "DEF",
//   "DECLARE",
//   "SHARED",
//   "STATIC",
//   "CONST",
//   "OPTION",
//   "BASE",
//   "SCREEN",
//   "CLS",
//   "COLOR",
//   "CIRCLE",
//   "PSET",
//   "LINE",
//   "SOUND",
//   "PLAY",
//   "PALETTE",
//   "VIEW",
//   "WINDOW",
//   "SYSTEM",
// ]);

// const Operators = new Set([
//   "+",
//   "-",
//   "*",
//   "/",
//   "^",
//   "=",
//   "<>",
//   "<",
//   "<=",
//   ">",
//   ">=",
//   "AND",
//   "OR",
//   "NOT",
//   "MOD",
//   "\\",
// ]);

// const Separators = new Set([",", ";", "(", ")", "[", "]", "{", "}"]);

// class Lexer {
//   constructor(input) {
//     this.input = input;
//     this.position = 0;
//     this.currentChar = input[this.position] || null;
//   }

//   advance() {
//     this.position++;
//     this.currentChar = this.input[this.position] || null;
//   }

//   skipWhitespace() {
//     while (this.currentChar && /[ \t\r]/.test(this.currentChar)) {
//       this.advance();
//     }
//   }

//   skipComment() {
//     if (this.currentChar === "'") {
//       while (this.currentChar && this.currentChar !== "\n") {
//         this.advance();
//       }
//       return { type: TokenType.COMMENT, value: "'" };
//     }
//     return null;
//   }

//   readNumber() {
//     let numStr = "";
//     while (this.currentChar && /[0-9.]/.test(this.currentChar)) {
//       numStr += this.currentChar;
//       this.advance();
//     }
//     return { type: TokenType.NUMBER, value: numStr };
//   }

//   readString() {
//     let str = "";
//     this.advance();
//     while (this.currentChar && this.currentChar !== '"') {
//       str += this.currentChar;
//       this.advance();
//     }
//     this.advance();
//     return { type: TokenType.STRING, value: str };
//   }

//   readIdentifier() {
//     let id = "";
//     while (this.currentChar && /[a-zA-Z0-9_]/.test(this.currentChar)) {
//       id += this.currentChar;
//       this.advance();
//     }
//     if (Keywords.has(id.toUpperCase())) {
//       return { type: TokenType.KEYWORD, value: id.toUpperCase() };
//     }
//     return { type: TokenType.IDENTIFIER, value: id };
//   }

//   getNextToken() {
//     while (this.currentChar) {
//       if (/[ \t\r]/.test(this.currentChar)) {
//         this.skipWhitespace();
//         continue;
//       }
//       if (this.currentChar === "'") {
//         return this.skipComment();
//       }
//       if (/[0-9]/.test(this.currentChar)) {
//         return this.readNumber();
//       }
//       if (this.currentChar === '"') {
//         return this.readString();
//       }
//       if (/[a-zA-Z_]/.test(this.currentChar)) {
//         return this.readIdentifier();
//       }
//       if (Operators.has(this.currentChar) || this.isComplexOperator()) {
//         return this.readOperator();
//       }
//       if (Separators.has(this.currentChar)) {
//         let token = { type: TokenType.SEPARATOR, value: this.currentChar };
//         this.advance();
//         return token;
//       }
//       throw new Error(`Unexpected character: ${this.currentChar}`);
//     }
//     return { type: TokenType.EOF, value: null };
//   }

//   isComplexOperator() {
//     return ["<>", "<=", ">=", "AND", "OR", "NOT"].some((op) =>
//       this.input.startsWith(op, this.position)
//     );
//   }

//   readOperator() {
//     let op = this.currentChar;
//     this.advance();
//     if (this.currentChar && Operators.has(op + this.currentChar)) {
//       op += this.currentChar;
//       this.advance();
//     }
//     return { type: TokenType.OPERATOR, value: op };
//   }

//   tokenize() {
//     const tokens = [];
//     let token;
//     do {
//       token = this.getNextToken();
//       tokens.push(token);
//     } while (token.type !== TokenType.EOF);
//     return tokens;
//   }
// }

// // Example usage
// const code = `
//   PRINT "Hello, World!"
//   DIM x AS INTEGER
//   x = 5 * 10
//   IF x >= 50 THEN PRINT "Large"
//   ' This is a comment
// `;

// const lexer = new Lexer(code);
// console.log(lexer.tokenize());
