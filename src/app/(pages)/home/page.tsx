"use client";

import { NestEntry, readNests } from "@/lib/indexedDB";
import NestListing from "@/shared/NestsListing";
import { useEffect, useState } from "react";

export default function Page() {
  const [nests, setNests] = useState<NestEntry[]>([]);
  useEffect(() => {
    const fetchNests = async () => {
      const nests = await readNests();
      setNests(nests);
    };
    fetchNests();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Recent Nests</h1>
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid max-w-[384px] grid-cols-1 sm:max-w-full gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 md:gap-y-10 lg:gap-x-8">
            {nests.map((nest, index) => (
              <NestListing
                key={index}
                nest={nest}
                link={`/code/${nest?.id}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
