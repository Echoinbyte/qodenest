import { LanguageKey } from "@/constants";
import { openDB } from "idb";

// Define the type for a nest entry
export interface NestEntry {
  id?: number; // Updated to match IndexedDB's key types
  fileName: string;
  language: LanguageKey;
  type: "Code" | "Document"; // Restrict to specific values
  title: string;
  description: string;
  code: string;
  createdAt: string; // ISO string format for timestamps
  updatedAt: string; // ISO string format for timestamps
}

// Initialize the IndexedDB database
const initDB = async () => {
  return openDB("QodeNest", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("nests")) {
        db.createObjectStore("nests", {
          keyPath: "id",
          autoIncrement: true, // Auto-generate unique IDs
        });
      }
    },
  });
};

// Create a new nest entry
export const createNest = async (
  nestData: Omit<NestEntry, "id" | "createdAt" | "updatedAt"> & {
    id?: number;
  }
): Promise<IDBValidKey | null> => {
  const db = await initDB();
  const transaction = db.transaction("nests", "readwrite");
  const store = transaction.objectStore("nests");

  const now = new Date().toISOString();
  const nestEntry: NestEntry = {
    ...nestData,
    createdAt: now,
    updatedAt: now,
  };

  const id = await store.add(nestEntry);
  console.log(`Nest added with id: ${id}`);
  return id;
};

// Read all nest entries
export const readNests = async (): Promise<NestEntry[]> => {
  const db = await initDB();
  const nests = await db.getAll("nests");
  console.log("Nests retrieved:", nests);
  return nests;
};

// Update a nest entry by ID
export const updateNest = async (
  id: number,
  updatedData: Partial<Omit<NestEntry, "id" | "createdAt">>
): Promise<NestEntry> => {
  const db = await initDB();
  const existingNest = await db.get("nests", id);

  if (!existingNest) {
    throw new Error(`Nest with id ${id} not found`);
  }

  const updatedNest: NestEntry = {
    ...existingNest,
    ...updatedData,
    updatedAt: new Date().toISOString(), // Update the updatedAt field
  };

  await db.put("nests", updatedNest);
  console.log(`Nest with id ${id} updated`);
  return updatedNest;
};

// Delete a nest entry by ID
export const deleteNest = async (id: number): Promise<void> => {
  const db = await initDB();
  await db.delete("nests", id);
  console.log(`Nest with id ${id} deleted`);
};

// Read a single nest entry by ID
export const readNestById = async (
  id: number
): Promise<NestEntry | undefined> => {
  const db = await initDB();
  const nest = await db.get("nests", id);
  console.log(`Nest with id ${id} retrieved:`, nest);
  return nest;
};
