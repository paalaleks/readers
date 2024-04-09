"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function NavBack() {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="">
      <ArrowLeft size={18} className="mr-2" />
      Back
    </Button>
  );
}
