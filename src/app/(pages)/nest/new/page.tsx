"use client";

import NewNestCreator from "@/components/element/newNestCreator";
import { Button } from "@/components/ui/button";
import { LANGUAGE_DATA, LanguageKey } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { createNest } from "@/lib/indexedDB";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

export default function Page() {
  const [language, setLanguage] = useState<LanguageKey>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [type, setType] = useState<"Code" | "Document">("Code");
  const { toast } = useToast();
  const router = useRouter();

  const nestCreator = async () => {
    if (!language || !title || !description || !fileName) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
      });
      return;
    }
    const id = await createNest({
      language,
      title,
      description,
      fileName,
      type,
      code: LANGUAGE_DATA[language].code_snippets,
    });

    router.push(`/code/${id}`);
  };

  return (
    <>
      <div className="pr-8">
        <nav className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FaRegFolderOpen size={24} />
            <h1 className="text-2xl font-semibold">Create a new Nest</h1>
          </div>
        </nav>
        <div className="pt-4">
          <NewNestCreator
            language={language}
            setLanguage={setLanguage}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            fileName={fileName}
            setFileName={setFileName}
            type={type}
            setType={setType}
            nestCreator={nestCreator}
            buttonLabel="Create new Nest"
          />
        </div>
      </div>
    </>
  );
}
