"use client";

import Navbar from "@/components/Navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import Editor, { loader, OnMount } from "@monaco-editor/react";
import CodeSectionNavbar from "@/components/CodeSectionNavbar";
import OutputSectionNavbar from "@/components/OutputSectionNavbar";
import { FaCircleHalfStroke, FaPause, FaPlay } from "react-icons/fa6";
import { ToastAction } from "@/components/ui/toast";
import { IconButton, Tooltip } from "@mui/material";
import { Fullscreen } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { IoPencil } from "react-icons/io5";
import { LANGUAGE_DATA, LanguageKey } from "@/constants";
import { FaSave } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import {
  Keywords,
  languageConfiguration,
  languageExtensionPoint,
  languageType,
  setupLanguage,
} from "@/language/customLanguageConfig";
import executeCode from "@/lib/executeCode";
import "@/styles/outputStyles.css";
import { createNest, readNestById, updateNest } from "@/lib/indexedDB";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { registerQBasicLanguage } from "@/config/registerLanguage";
import { registerQBasicCompletionProvider } from "@/config/qbasicCompletionProvider";
import { registerJavaCompletionProvider } from "@/config/javaCompletionProvider";
import * as ts from "typescript";
import { Script, createContext } from "vm";

function Main() {
  // Setting up the QBASIC language for the editor
  const isMonacoConfigured = useRef(false);

  useEffect(() => {
    if (isMonacoConfigured.current) return;

    loader.init().then((monaco) => {
      registerQBasicLanguage(monaco);
      registerQBasicCompletionProvider(monaco);
      registerJavaCompletionProvider(monaco);

      isMonacoConfigured.current = true;
    });
  }, []);

  // editor reference
  const editorRef = useRef<any | null>(null);

  // toast hook
  const { toast } = useToast();

  // states and logic for full screen
  const [isFullScreenCodeSection, setIsFullScreenCodeSection] =
    useState<boolean>(false);
  const [isFullScreenOutputSection, setIsFullScreenOutputSection] =
    useState<boolean>(false);

  const toggleFullScreenCodeSection = () => {
    setIsFullScreenCodeSection(!isFullScreenCodeSection);
  };
  const toggleFullScreenOutputSection = () => {
    setIsFullScreenOutputSection(!isFullScreenOutputSection); // Toggle full-screen state
  };

  // states for language
  const path = usePathname();
  const [language, setLanguage] = useState<LanguageKey>("qb");
  const [fileName, setFileName] = useState("SOURCE");
  const [id, setId] = useState<number>(parseInt(path.replaceAll("/code/", "")));
  const [ranEvaluatedJSCode, setRanEvaluatedJSCode] = useState<string>(``);

  // states for Theme
  const { theme } = useTheme();

  // Logic for saving the code language to localStorage
  const saveLanguageNameToLocalStorage = (newLanguageName: LanguageKey) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("languageName", newLanguageName);
    }
  };

  // states for editor value and output
  const [value, setValue] = useState<string>(
    LANGUAGE_DATA[language].code_snippets
  );
  const [isError, setIsError] = useState<boolean>(false);

  // states for running state of the code
  const [loading, setLoading] = useState<boolean>(false);

  // Logic for fetching the code language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguageName = localStorage.getItem("languageName");
      if (
        savedLanguageName &&
        Object.keys(LANGUAGE_DATA).includes(savedLanguageName) // Ensure valid language
      ) {
        setLanguage(savedLanguageName as LanguageKey); // Cast to LanguageKey
        setValue(LANGUAGE_DATA[savedLanguageName as LanguageKey].code_snippets); // Update editor value
      }
    }
  }, []);

  // Logic for fetching the code from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("code");
      if (savedCode) {
        setValue(savedCode);
      }
    }
  }, []);

  // onMount function for the editor
  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // onLanguageSelect function for the language selector
  const onLanguageSelect = (language: LanguageKey) => {
    setLanguage(language);
    saveLanguageNameToLocalStorage(language);
    setValue(LANGUAGE_DATA[language].code_snippets);
  };

  // runTheCode function to run the code
  const runTheCode = async () => {
    const sourceCode = editorRef.current.getValue();
    const context = createContext({
      output,
      input,
      console,
    });
    const aboutCode = {
      language: LANGUAGE_DATA[language].name,
    };

    if (!sourceCode) return;
    if (!window) return;
    clearOutput(false);

    if (ranEvaluatedJSCode) {
      new Script(ranEvaluatedJSCode).runInContext(context);
      return;
    }

    if (language === "javascript") {
      new Script(sourceCode).runInContext(context);
      setRanEvaluatedJSCode(sourceCode);
      return;
    }
    if (language === "typescript") {
      const jsCode = ts.transpile(sourceCode);
      new Script(jsCode).runInContext(context);
      setRanEvaluatedJSCode(jsCode);
      return;
    }

    try {
      setLoading(true);
      const JS_Code = await executeCode(sourceCode, aboutCode);

      const evalJS_CODE = JS_Code.replace(/```javascript|```/g, "").trim();
      new Script(evalJS_CODE).runInContext(context);
      setRanEvaluatedJSCode(evalJS_CODE);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the server.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  // clearOutput function to clear the output
  const clearOutput = (displayToast: boolean) => {
    const outputDiv = document.getElementById("output");
    while (outputDiv?.firstChild) {
      outputDiv.removeChild(outputDiv.firstChild);
    }
    if (displayToast) {
      toast({
        title: "Cleared! 🎉",
        description: "The Output has been cleared.",
      });
    }
  };

  // Saving the file in the user's storage
  const saveFileToPCStorage = () => {
    const codeContent = editorRef.current?.getValue() || "";
    const blob = new Blob([codeContent], { type: "text/plain" });
    const fileNameToSave = fileName || "SOURCE";
    const languageName = language || "Qbasic";
    const fileExtension =
      LANGUAGE_DATA[languageName as LanguageKey].extension || ".bas";
    const fileNameWithExtension = `${fileNameToSave}${fileExtension}`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileNameWithExtension;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isIDBConfigured = useRef(false);

  useEffect(() => {
    if (isIDBConfigured.current) return;

    const initializeData = async () => {
      try {
        const data = await readNestById(id);
        if (data?.id) {
          // Populate the state with existing data
          setFileName(data.fileName);
          setLanguage(data.language);
          setValue(data.code);
          setId(data.id);
          return;
        }

        // Create a new nest entry
        await createNest({
          id: id, // Optional: Ensure `id` is valid
          fileName: fileName || "Untitled",
          type: "Code",
          language: language || "qb",
          title: "SOURCE FILE",
          description: "Code Snippet",
          code: value || "",
        });
        console.log("New code entry created");
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        isIDBConfigured.current = true;
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    setRanEvaluatedJSCode(``);
    const timer = setTimeout(async () => {
      await updateNest(id, {
        fileName: fileName,
        language: language,
        code: value,
      });
    }, 10 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [id, value, fileName, language]);

  return (
    <>
      <Navbar
        saveFileToPCStorage={saveFileToPCStorage}
        setLanguage={setLanguage}
        setValue={setValue}
      />
      {/* Navbar */}
      <Separator className="h-1 dark:bg-[#0E0E0E] bg-[#F1F1F1]" />{" "}
      {/* Separator */}
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-64px-4px)] w-full dark:bg-[#2E3440] dark:text-white bg-[#D1CBBF] text-black"
      >
        {/* ResizablePanelGroup for Equal-Sections of Code and Output */}
        <ResizablePanel defaultSize={50} maxSize={80} minSize={20}>
          {/* ResizablePanel for Code Section */}
          <div
            className={`${
              isFullScreenCodeSection
                ? "w-full h-screen fixed top-0 left-0 z-20"
                : "w-full relative"
            } transition-all duration-300`}
          >
            <div className="dark:bg-[#232323] bg-[#DCDCDC] h-8 text-sm dark:text-[#BDBBB8] text-[#424447] flex items-center justify-between px-8">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icon512_maskable.png"}
                  alt="QBasic Logo"
                  width={20}
                  height={20}
                ></Image>
                <input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="border-none outline-none bg-transparent text-inherit w-auto cursor-text font-mono max-w-[35vw] line-clamp-1 peer"
                />
              </div>
              <div className="flex items-center gap-3">
                <Tooltip title="Full Screen" placement="bottom" arrow>
                  <IconButton
                    aria-label="Full Screen"
                    color="info"
                    className="cursor-pointer"
                    onClick={toggleFullScreenCodeSection}
                  >
                    <Fullscreen size={14} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {/* CodeSectionNavbar */}
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height={
                isFullScreenCodeSection
                  ? "calc(100vh - 32px)"
                  : "calc(100vh - 64px - 4px - 32px)"
              }
              theme={theme === "dark" ? "vs-dark" : "light"}
              language={language}
              defaultValue={LANGUAGE_DATA[language].code_snippets}
              onMount={onMount}
              value={value}
              onChange={(newValue) => setValue(newValue || "")}
            />
            {/* Code Editor */}
            <button
              className={`
          absolute right-10 bottom-10 transition-colors h-14 w-14 rounded-full flex items-center justify-center
          ${
            loading === false
              ? "bg-[#0288D1] hover:bg-[#1976D2]"
              : "bg-[#EF5350]"
          }
          `}
              aria-label="Run the code"
              onClick={runTheCode}
            >
              {loading === false ? (
                <FaPlay className="text-slate-50" />
              ) : (
                <FaCircleHalfStroke className="text-slate-50 animate-spin" />
              )}
            </button>
            {/* Run Button, Pause Button */}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle /> {/* ResizableHandle */}
        <ResizablePanel defaultSize={50} maxSize={80} minSize={20}>
          {/* ResizablePanel for Output Section */}
          <div
            className={`${
              isFullScreenOutputSection
                ? "w-full h-screen fixed top-0 left-0 z-20"
                : "w-full"
            } transition-all duration-300`}
          >
            <OutputSectionNavbar
              onFullScreenToggle={toggleFullScreenOutputSection}
              clearOutput={() => clearOutput(true)}
            />
            {/* OutputSectionNavbar */}
            <div
              className={`px-4 dark:bg-[#1E1E1E] bg-[#FFFFFF] w-full font-mono
          ${
            isFullScreenOutputSection
              ? "h-[calc(100vh-32px)]"
              : "h-[calc(100vh-64px-4px-32px)]"
          }
          ${
            isError
              ? "dark:text-red-400 text-red-600"
              : "dark:text-white text-black"
          }
        `}
            >
              <style jsx>{`
                #output {
                  scrollbar-width: thin; /* Firefox - thin scrollbar */
                  scrollbar-color: transparent transparent;
                }

                #output:hover {
                  scrollbar-color: ${theme === "dark" ? "#424242" : "#C1C1C0"}
                    transparent; /* Firefox - change scrollbar color on hover */
                }
              `}</style>
              <div
                id="output"
                className={`${
                  isFullScreenOutputSection
                    ? "h-[calc(100vh-32px)]"
                    : "h-[calc(100vh-64px-4px-32px)]"
                }
                overflow-y-auto overscroll-x-auto
              `}
              ></div>
            </div>
            {/* Output */}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Main;

export function output(
  content: string | HTMLElement,
  type: "HTMLElement" | "Inline" | "Block" | "Error" = "Block"
) {
  const outputDiv = document.getElementById("output");

  if (!outputDiv) return; // Ensure the output div exists

  if (type === "HTMLElement" && content instanceof HTMLElement) {
    // Append the content directly if it's an HTML element
    outputDiv.appendChild(content);
    return;
  }

  let newElement: HTMLElement;

  switch (type) {
    case "Inline":
      newElement = document.createElement("span");
      newElement.textContent = content as string;
      newElement.className = "output-inline-text"; // Class for styling inline text
      break;

    case "Error":
      newElement = document.createElement("p");
      newElement.textContent = content as string;
      newElement.className = "error-text"; // Class for styling error text
      break;

    case "Block":
    default:
      newElement = document.createElement("p");
      newElement.innerHTML = content as string;
      newElement.className = "output-text"; // Class for styling block text
      break;
  }

  // Append the newly created element to the outputDiv
  outputDiv.appendChild(newElement);
}

// Input function: Creates an input field with a label and returns the value via a Promise when Enter is pressed
export function input(prompt: string) {
  return new Promise((resolve) => {
    const outputDiv = document.getElementById("output");

    // Create a div container to hold the label and input field
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container"; // Added class for styling

    // Create label for the prompt
    const label = document.createElement("label");
    label.textContent = prompt;
    label.className = "input-label"; // Added className for styling
    inputContainer.appendChild(label);

    // Create input element
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.className = "input-field"; // Added className for styling
    inputContainer.appendChild(inputElement);

    // Append the input container to the output div
    outputDiv?.appendChild(inputContainer);

    // Listen for Enter key press to resolve the promise with the input value
    inputElement.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        // Resolve the Promise with the input value
        resolve(inputElement.value);
        inputElement.blur();
        inputElement.setAttribute("readonly", "true");
        inputElement.classList.add("readonly");
      }
    });

    // Focus on the input element for better UX
    inputElement.focus();
  });
}
