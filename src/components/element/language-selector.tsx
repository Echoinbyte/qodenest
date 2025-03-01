"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { LanguageKey } from "@/constants";

const languages = [
  {
    group: "Favourites",
    items: [
      {
        value: "qb",
        label: "QBasic",
        logo: "🖥️",
        subtext: "Legacy Programming",
      },
      {
        value: "javascript",
        label: "JavaScript",
        logo: "🟨",
        subtext: "Frontend & Backend",
      },
    ],
  },
  {
    group: "Template",
    items: [
      {
        value: "typescript",
        label: "TypeScript",
        logo: "🟦",
        subtext: "Typed JavaScript",
      },
      { value: "c#", label: "C#", logo: "🎮", subtext: "Game Development" },
    ],
  },
  {
    group: "Languages",
    items: [
      { value: "c", label: "C", logo: "📘", subtext: "System Programming" },
      { value: "cpp", label: "C++", logo: "💻", subtext: "Game & System" },
      {
        value: "java",
        label: "Java",
        logo: "☕",
        subtext: "Enterprise & Backend",
      },
      { value: "python", label: "Python", logo: "🐍", subtext: "AI & Backend" },
      { value: "php", label: "PHP", logo: "🌐", subtext: "Web Development" },
    ],
  },
];

interface LanguageSelectorProps {
  value: LanguageKey;
  onChange: (value: LanguageKey) => void;
}

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <Command className="h-2/3">
      <CommandInput placeholder="Search language..." />
      <CommandList>
        <CommandEmpty>No language found.</CommandEmpty>
        {languages.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((language) => (
              <CommandItem
                key={language.value}
                onSelect={() => {
                  onChange(
                    language.value === value
                      ? ""
                      : (language.value as LanguageKey)
                  );
                }}
                className="flex items-center justify-between space-x-3"
              >
                {/* Left side: Logo and labels */}
                <div className="flex items-center space-x-3">
                  <span className="text-xl">
                    {typeof language.logo === "string" ? (
                      language.logo
                    ) : (
                      <>{/* <language.logo size={20} /> */}</>
                    )}
                  </span>
                  <div className="flex flex-col">
                    <span className={cn("text-sm font-medium")}>
                      {language.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {language.subtext}
                    </span>
                  </div>
                </div>

                {/* Right side: Check mark */}
                <Check
                  className={cn(
                    "h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
}
