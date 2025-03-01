import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FileNameInput({ value, onChange }: FileNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="fileName" className="text-lg font-semibold">
        File Name
      </Label>
      <Input
        id="fileName"
        placeholder="Name your file"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-4 pr-10 py-3 text-lg rounded-lg border-2 border-primary/50 focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
      />
    </div>
  );
}
