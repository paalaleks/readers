"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FormPairCode({ userId: userId }: { userId: string }) {
  const [codeValue, setCodeValue] = useState<string>("");
  const [buttonStatus, setButtonStatus] = useState("stale");

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonStatus === "failed") {
      timer = setTimeout(() => {
        setButtonStatus("stale");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [buttonStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonStatus("loading");

    let { data: uniqueCodes, error } = await supabase
      .from("uniqueCodes")
      .select("codeSeries, code");

    const filteredCodes =
      uniqueCodes?.filter((code: any) => {
        return code.codeSeries === codeValue;
      }) ?? [];

    if (filteredCodes.length === 0) {
      setButtonStatus("failed");
      return;
    }
    if (filteredCodes.length > 0) {
      await uploadJsonToSupabase({ filteredCodes });
    }
  };

  const uploadJsonToSupabase = async ({
    filteredCodes,
  }: {
    filteredCodes: any[];
  }) => {
    const { error } = await supabase
      .from("myLibrary")
      .update({ codeSeries: filteredCodes })
      .eq("user_id", userId);

    if (error) {
      setButtonStatus("failed");
    } else {
      router.push(
        "/my-library/books?message=You have successfully paired labels, you can now add books to your library.",
      );
    }
  };

  let buttonText;
  switch (buttonStatus) {
    case "loading":
      buttonText = "Loading...";
      break;
    case "failed":
      buttonText = "Failed pairing! Try again.";
      break;
    case "stale":
    default:
      buttonText = "Pair labels";
  }

  return (
    <div className="flex flex-col w-full max-w-sm items-center space-x-2">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="6 characters"
          minLength={6}
          maxLength={6}
          required
          onChange={(e) => setCodeValue(e.target.value)}
        />
        <Button className="w-full mt-4" type="submit">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}
