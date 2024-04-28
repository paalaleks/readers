"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function NavBack() {
  const router = useRouter();

  const handleBack = () => {
    if (
      !document.referrer ||
      !document.referrer.includes(window.location.origin)
    ) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <Button variant="ghost" onClick={handleBack} className="">
      <ArrowLeft size={18} className="mr-2" />
      Back
    </Button>
  );
}
