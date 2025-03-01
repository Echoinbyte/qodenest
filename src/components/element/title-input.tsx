import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-lg font-semibold">
        Title
      </Label>
      <Input
        id="title"
        placeholder="Enter an awesome title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-4 pr-10 py-3 text-lg rounded-lg border-2 border-primary/50 focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg"
      />
    </div>
  );
}
