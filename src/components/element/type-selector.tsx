import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileCode, FileText } from "lucide-react";

interface TypeSelectorProps {
  value: "Code" | "Document";
  onChange: (value: "Code" | "Document") => void;
}

export default function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold">Type</Label>
      <RadioGroup
        value={value}
        onValueChange={(newValue) => onChange(newValue as "Code" | "Document")}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Code" id="Code" />
          <Label
            htmlFor="Code"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FileCode className="w-5 h-5 text-primary" />
            <span>Code</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Document" id="Document" />
          <Label
            htmlFor="Document"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span>Document</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
