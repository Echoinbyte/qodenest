import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Globe, Lock } from "lucide-react"

interface VisibilitySelectorProps {
  value: boolean
  onChange: (value: boolean) => void
}

export default function VisibilitySelector({ value, onChange }: VisibilitySelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold">Visibility</Label>
      <RadioGroup
        value={value ? "public" : "private"}
        onValueChange={(newValue) => onChange(newValue === "public")}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <Label
            htmlFor="public"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Globe className="w-5 h-5" />
            <span>Public</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <Label
            htmlFor="private"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Lock className="w-5 h-5" />
            <span>Private</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

