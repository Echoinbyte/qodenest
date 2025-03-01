"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { FaFolder, FaGithub, FaSave } from "react-icons/fa";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import SwitchTheme from "./theme/SwitchTheme";
import { getLanguageByExtension } from "@/lib/getLanguageByExtension";
import { LanguageKey } from "@/constants";

function Navbar({
  saveFileToPCStorage,
  setLanguage,
  setValue,
}: {
  saveFileToPCStorage: () => void;
  setLanguage: (language: LanguageKey) => void;
  setValue: (value: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>(""); // To store file name

  // Function to handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setFileName(file.name); // Store the file name
      const fileContent = await file.text(); // Read the file content
      const extension = file.name.split(".").pop(); // Get the file extension
      const language = getLanguageByExtension(`.${extension}`); // Get the language based on the file extension
      setValue(fileContent); // Store the file content
      setLanguage(language); // Set the language based on the file extension
    }
  };

  // Function to trigger file input on button click
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  return (
    <nav className="w-full h-16 dark:bg-[#262626] dark:text-white bg-[#DADADA] text-black flex items-center justify-between px-8">
      <div>
        <Logo />
      </div>
      <ul className="flex gap-1 items-center">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".js,.ts,.py,.java,.cs,.php" // Restrict to code file extensions
            onChange={handleFileChange}
          />
          <IconButton
            aria-label="Open Folder"
            color="primary"
            className="cursor-pointer px-3 py-3"
            onClick={openFilePicker}
          >
            <FaFolder />
          </IconButton>
        </div>
        <IconButton
          aria-label="Save File"
          color="primary"
          className="cursor-pointer px-3 py-3"
          onClick={saveFileToPCStorage}
        >
          <FaSave className="h-6 w-6" />
        </IconButton>
        <SwitchTheme />
        <Tooltip title="View on Github" placement="bottom" arrow>
          <Link href={"https://github.com/echoinbyte"} target="_blank">
            <IconButton
              aria-label="Visit Github"
              color="info"
              className="cursor-pointer px-3 py-3"
            >
              <FaGithub className="h-6 w-6" />
            </IconButton>
          </Link>
        </Tooltip>
      </ul>
    </nav>
  );
}

export default Navbar;
