"use client";

import Navbar from "@/components/Navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import CodeSectionNavbar from "./CodeSectionNavbar";
import OutputSectionNavbar from "./OutputSectionNavbar";
import { CODE_SNIPPETS, LANGUAGE_FILE_EXTENSIONS } from "@/constants";
import { FaCircleHalfStroke, FaPause, FaPlay } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { executeCode } from "@/lib/executeCode";
import { useTheme } from "next-themes";

export type LanguageKey = keyof typeof CODE_SNIPPETS;

function Main() {
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
  const [language, setLanguage] = useState<LanguageKey>("javascript");

  // states for Theme
  const { theme } = useTheme();

  // Logic for saving the code language to localStorage
  const saveLanguageNameToLocalStorage = (newLanguageName: LanguageKey) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("languageName", newLanguageName);
    }
  };

  // states for editor value and output
  const [value, setValue] = useState<string>(CODE_SNIPPETS[language]);
  const [output, setOutput] = useState<any>("");
  const [isError, setIsError] = useState<boolean>(false);

  // Save the code to localStorage whenever user saves it
  const saveCodeToLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("code", editorRef.current.getValue());
      toast({
        title: "Saved! 🎉",
        description: "Your wonderful code has been saved.",
      });
    }
  };

  // states for running state of the code
  const [loading, setLoading] = useState<boolean>(false);

  // Logic for fetching the code language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguageName = localStorage.getItem("languageName");
      if (
        savedLanguageName &&
        Object.keys(CODE_SNIPPETS).includes(savedLanguageName) // Ensure valid language
      ) {
        setLanguage(savedLanguageName as LanguageKey); // Cast to LanguageKey
        setValue(CODE_SNIPPETS[savedLanguageName as LanguageKey]); // Update editor value
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
    setValue(CODE_SNIPPETS[language]);
  };

  // runTheCode function to run the code
  const runTheCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
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
  const clearOutput = () => {
    setOutput("");
    toast({
      title: "Cleared! 🎉",
      description: "The Output has been cleared.",
    });
  };

  // Saving the file in the user's storage
  const LANGUAGE_FILE_EXTENSIONS: Record<LanguageKey, string> = {
    javascript: ".js",
    typescript: ".ts",
    python: ".py",
    java: ".java",
    csharp: ".cs",
    php: ".php",
  };

  const saveFileToPCStorage = () => {
    // Get the code content from the editor
    const codeContent = editorRef.current?.getValue() || "";
    // Create a Blob object with the code content
    const blob = new Blob([codeContent], { type: "text/plain" });
    // Get file name and language name from localStorage or use defaults
    const fileName = localStorage.getItem("fileName") || "SOURCE";
    const languageName = localStorage.getItem("languageName") || "javascript";
    // Determine the file extension based on the language
    const fileExtension =
      LANGUAGE_FILE_EXTENSIONS[languageName as LanguageKey] || ".js";
    // Create the complete file name with extension
    const fileNameWithExtension = `${fileName}${fileExtension}`;
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileNameWithExtension; // Set the download file name
    a.click(); // Trigger the download
    // Revoke the Blob URL to free up resources
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar
        saveFileToPCStorage={saveFileToPCStorage}
        setLanguage={setLanguage}
        setValue={setValue}
      />
      {/* Navbar */}
      <Separator className="h-1 dark:bg-[#0E0E0E] bg-[#F1F1F1]" /> {/* Separator */}
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
            <CodeSectionNavbar
              onFullScreenToggle={toggleFullScreenCodeSection}
              onLanguageSelect={onLanguageSelect}
              language={language}
              saveCodeToLocalStorage={saveCodeToLocalStorage}
            />
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
              defaultValue={CODE_SNIPPETS[language]}
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
              clearOutput={clearOutput}
            />
            {/* OutputSectionNavbar */}
            <div
              className={`p-4 dark:bg-[#1E1E1E] bg-[#FFFFFF] w-full font-mono
          ${
            isFullScreenOutputSection
              ? "h-[calc(100vh-32px)]"
              : "h-[calc(100vh-64px-4px-32px)]"
          }
          ${isError ? "dark:text-red-400 text-red-600" : "dark:text-white text-black"}
        `}
            >
              {output}
            </div>
            {/* Output */}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Main;
