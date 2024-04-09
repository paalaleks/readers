import { Check } from "lucide-react";

export default function SavedAlert() {
  return (
    <span className="absolute right-5 bottom-2 text-primary text-xs inline-flex items-center select-none">
      <Check size={14} className="mr-1" /> Saved
    </span>
  );
}
