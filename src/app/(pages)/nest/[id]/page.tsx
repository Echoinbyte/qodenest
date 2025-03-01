"use client";

import NewNestCreator from "@/components/element/newNestCreator";
import { LanguageKey } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { NestEntry, readNestById, updateNest } from "@/lib/indexedDB";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";

function Page() {
  const path = usePathname();
  const [id, setId] = useState<number>(parseInt(path.replaceAll("/nest/", "")));
  const [language, setLanguage] = useState<LanguageKey>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [type, setType] = useState<"Code" | "Document">("Code");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = await readNestById(id);
        if (data) {
          setLanguage(data.language);
          // setIsPublic(data.isPublic);
          setTitle(data.title);
          setDescription(data.description);
          setFileName(data.fileName);
          setType(data.type);
          console.table(data);
          return;
        }
        toast({
          title: "Error",
          description: "Nest not found! Redirecting to nest page...",
        });
        router.push("/nest");
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
  }, [id, router, toast]);

  const nestCreator = async () => {
    if (!language || !title || !description || !fileName) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
      });
      return;
    }
    await updateNest(id, {
      description,
      fileName,
      language,
      title,
      type,
    });

    router.push(`/code/${id}`);
  };

  return (
    <>
      <div className="pr-8">
        <nav className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FaRegFolderOpen size={24} />
            <h1 className="text-2xl font-semibold">Update the Nest</h1>
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
            buttonLabel="Update Nest"
          />
        </div>
      </div>
    </>
  );
}

export default Page;
