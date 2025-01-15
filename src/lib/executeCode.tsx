import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LANGUAGE_VERSIONS } from "@/constants/index";

type LanguageKey = keyof typeof LANGUAGE_VERSIONS;

interface ExecuteCodeResponse {
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
  };
  version: string;
  language: string;
}

const API: AxiosInstance = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: LanguageKey,
  sourceCode: string
): Promise<ExecuteCodeResponse> => {
  const response: AxiosResponse<ExecuteCodeResponse> = await API.post(
    "/execute",
    {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    }
  );
  return response.data;
};
