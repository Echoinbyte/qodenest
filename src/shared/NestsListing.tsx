"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { dateFromNow } from "@/lib/formattedDate";
import Image from "next/image";
import { LANGUAGE_DATA, LanguageKey } from "@/constants";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface NestListingProps {
  nest: any | null;
  index: number;
  link: string;
}

const NestListing = ({ nest, index, link }: NestListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75 + 1000);

    return () => clearTimeout(timer);
  }, [index]);

  if (!nest || !isVisible) return <NestPlaceholder />;

  if (isVisible && nest) {
    return (
      <>
        <div className="relative group">
          <Link href={link}>
            <div className="relative group">
              <div className="z-20 absolute m-2 p-2 top-0 right-0 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={`/nest/${nest?.id}`} passHref>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-cyan-500 text-black rounded py-[1px] px-1 flex flex-row items-center text-[0.8rem] leading-[1.4rem] font-medium gap-1"
                  >
                    <Pencil size={12.8} />
                    Edit
                  </button>
                </Link>
              </div>
              <Image
                className="object-contain w-full h-full"
                height={192} // Maintain your height
                width={341} // Maintain your width
                style={{
                  aspectRatio: "341 / 192",
                  objectFit: "contain", // Ensures the image is fully visible without stretching or cropping
                }}
                loading="eager"
                quality={100}
                src={
                  LANGUAGE_DATA[nest?.language as LanguageKey].image ||
                  "/icon512_maskable.png"
                }
                alt="Blog image"
              />

              {new Date(nest?.createdAt) >
                new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) && (
                <span className="top-0 left-0 m-2 flex flex-row absolute z-[1] transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  <span className="block mr-1">
                    <span className="bg-white text-[#030303] rounded py-[1px] px-1 flex flex-row items-center text-[0.8rem] leading-[1.4rem] font-medium">
                      <div className="block">New</div>
                    </span>
                  </span>
                </span>
              )}

              <span className="absolute right-0 bottom-0 m-2 px-1 py-[1px] rounded-sm bg-black/40 text-white text-sm z-[1]">
                {nest?.type}
              </span>
            </div>
          </Link>
          <div className="py-2 px-4">
            <div className="w-full h-full flex gap-4 pt-2">
              <div className="flex justify-center flex-col">
                <h5 className="text-base line-clamp-2 text-[#0f0f0f] dark:text-[#f0f0f0]">
                  {nest?.title}
                </h5>
                <h5 className="mt-[2px] text-sm line-clamp-2 text-[#606060] dark:text-[#9f9f9f]">
                  {nest?.description}
                </h5>
                <div>
                  <h6 className="flex flex-row items-center gap-2">
                    <span className="text-sm text-[#606060] dark:text-[#9f9f9f]">
                      {nest?.fileName}
                      {LANGUAGE_DATA[nest.language as LanguageKey]?.extension}
                    </span>
                    <span className="text-md text-[#606060] dark:text-[#9f9f9f]">
                      &middot;
                    </span>
                    <span className="text-sm text-[#606060] dark:text-[#9f9f9f]">
                      {dateFromNow(nest?.createdAt)?.replace(/^about\s*/i, "")}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </>
    );
  }
};

const NestPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <Skeleton className="w-full h-[192px]" />
      <div className="pl-4 py-2">
        <Skeleton className="mt-3 w-full h-[16px]" />
        <Skeleton className="mt-4 w-full h-[14px]" />
        <Skeleton className="mt-4 w-full h-[14px]" />
      </div>
    </div>
  );
};

export default NestListing;
