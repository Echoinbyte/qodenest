"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LanguageSelector from "./language-selector";
import VisibilitySelector from "./visibility-selector";
import TitleInput from "./title-input";
import DescriptionInput from "./description-input";
import FileNameInput from "./file-name-input";
import TypeSelector from "./type-selector";
import "@/styles/inputBox.css";
import { LanguageKey } from "@/constants";
import { Button } from "../ui/button";

export default function NewNestCreator({
  language,
  setLanguage,
  isPublic,
  setIsPublic,
  title,
  setTitle,
  description,
  setDescription,
  fileName,
  setFileName,
  type,
  setType,
  nestCreator,
  buttonLabel
}: any) {
  return (
    <div className="transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8 space-y-6"
          >
            <h2 className="text-xl font-bold mb-4">Template Settings</h2>
            <FileNameInput value={fileName} onChange={setFileName} />
            <LanguageSelector value={language} onChange={setLanguage} />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-8 space-y-6"
          >
            <h2 className="text-xl font-bold mb-4">Content Details</h2>
            <TitleInput value={title} onChange={setTitle} />
            <DescriptionInput value={description} onChange={setDescription} />
            <VisibilitySelector value={isPublic} onChange={setIsPublic} />
            <TypeSelector value={type} onChange={setType} />
            <Button
              onClick={() => nestCreator()}
              variant={"default"}
              className="w-full"
            >
              {buttonLabel ||  "Create new Nest"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
