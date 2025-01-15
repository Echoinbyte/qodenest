"use client";

import { Fullscreen } from "lucide-react";
import React from "react";
import { FaDesktop } from "react-icons/fa";
import { BiNoEntry } from "react-icons/bi";
import { IconButton, Tooltip } from "@mui/material";

interface OutputSectionNavbarProps {
  onFullScreenToggle: () => void;
  clearOutput: () => void;
}

function OutputSectionNavbar({
  onFullScreenToggle,
  clearOutput,
}: OutputSectionNavbarProps) {
  return (
    <div className="dark:bg-[#232323] bg-[#DCDCDC] h-8 text-sm dark:text-[#BDBBB8] text-[#424447] flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <FaDesktop size={12} />
        <div className="flex items-center">Output</div>
      </div>
      <div className="flex items-center gap-3">
        <Tooltip title="Clear Output" placement="bottom" arrow>
          <IconButton
            aria-label="Clear Output"
            color="error"
            className="cursor-pointer"
            onClick={clearOutput}
          >
            <BiNoEntry size={14} />
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

export default OutputSectionNavbar;
