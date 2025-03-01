"use client";
import { IconButton, Tooltip } from "@mui/material";
import { Fullscreen } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { IoPencil } from "react-icons/io5";
import { LANGUAGE_DATA, LanguageKey } from "@/constants";
import { FaSave } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const languages = Object.entries(LANGUAGE_DATA);
interface CodeSectionNavbarProps {
  onFullScreenToggle: () => void;
  setFileNameOnMain: (fileName: string) => void;
  onLanguageSelect: (language: LanguageKey) => void;
  language: LanguageKey;
  saveCodeToLocalStorage: () => void;
}

function CodeSectionNavbar({
  onFullScreenToggle,
  setFileNameOnMain,
  onLanguageSelect,
  language,
  saveCodeToLocalStorage,
}: CodeSectionNavbarProps) {
  const [fileName, setFileName] = useState<string>("SOURCE");
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const { toast } = useToast();

  // Save fileName to localStorage whenever it changes
  const saveToLocalStorage = (newFileName: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fileName", newFileName);
    }
  };

  // Sanitize input and limit character count
  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const sanitized = (e.currentTarget.textContent || "")
      .replace(/\s/g, "")
      .replace(/[\n\r]/g, "");
    if (spanRef.current) {
      spanRef.current.textContent = sanitized; // Replace content with sanitized and limited version
    }
  };

  const handleBlur = () => {
    if (spanRef.current) {
      const updatedFileName = spanRef.current.textContent || "";
      setFileName(updatedFileName);
      setFileNameOnMain(updatedFileName);
      saveToLocalStorage(updatedFileName);
      toast({
        title: "Saved! 🎉",
        description: "Your wonderful File Name has been saved.",
      });
    }
  };

  return (
    <div className="dark:bg-[#232323] bg-[#DCDCDC] h-8 text-sm dark:text-[#BDBBB8] text-[#424447] flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Tooltip title="Click to rename" placement="top" arrow>
            <span
              ref={spanRef}
              contentEditable
              suppressContentEditableWarning
              className="border-none outline-none bg-transparent text-inherit w-auto cursor-text font-mono max-w-[35vw] line-clamp-1 peer" // Restrict width to 40vw
              onInput={handleInput} // Sanitize and limit length while typing
              onBlur={handleBlur} // Save changes when editing ends
            >
              {fileName}
            </span>
          </Tooltip>
          <kbd className="cursor-default">
            {LANGUAGE_DATA[language as LanguageKey].extension}
          </kbd>
          <IoPencil className="ml-2 text-[#BDBBB8] peer-hover:opacity-100 opacity-0 transition-opacity" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Tooltip title="Save the code" placement="bottom" arrow>
          <IconButton
            aria-label="Save the code"
            color="success"
            className="cursor-pointer"
            onClick={saveCodeToLocalStorage}
          >
            <FaSave size={14} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Full Screen" placement="bottom" arrow>
          <IconButton
            aria-label="Full Screen"
            color="info"
            className="cursor-pointer"
            onClick={onFullScreenToggle}
          >
            <Fullscreen size={14} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default CodeSectionNavbar;
