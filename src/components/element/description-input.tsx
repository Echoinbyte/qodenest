import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionInput({
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-lg font-semibold">
        Description
      </Label>
      <Textarea
        id="description"
        placeholder="Describe your amazing template"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-4 pr-10 py-3 text-lg rounded-lg border-2 border-primary/50 focus:border-primary transition-all duration-300 shadow-sm focus:shadow-lg min-h-[100px]"
      />
    </div>
  );
}
