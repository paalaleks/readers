"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const REGEXP_ONLY_DIGITS_AND_CHARS = "^[A-Za-z0-9]+$";

export default function FormPairCode({ userId: userId }: { userId: string }) {
  const [codeValue, setCodeValue] = useState<string>("");
  const [statusText, setStatusText] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const fetchCurrentUserData = useCallback(async () => {
    const { data: currentUserData, error: currentUserError } = await supabase
      .from("myLibrary")
      .select("codeSeries")
      .eq("user_id", userId)
      .single();

    return { currentUserData, currentUserError };
  }, [supabase, userId]);

  const uploadJsonToSupabase = useCallback(
    async ({ filteredCodes }: { filteredCodes: string[] }) => {
      const {
        currentUserData,
        currentUserError,
      } = await fetchCurrentUserData();

      if (currentUserError) {
        setStatusText("Pairing failed");
        return;
      }

      let existingCodes = currentUserData?.codeSeries || [];
      let updatedCodes = [
        ...existingCodes,
        ...filteredCodes.filter((code) => !existingCodes.includes(code)),
      ];

      const { error: updateError } = await supabase
        .from("myLibrary")
        .update({ codeSeries: updatedCodes })
        .eq("user_id", userId);

      if (updateError) {
        setStatusText("Pairing failed. Failed to add more codes.");
      } else {
        router.push(
          "/dashboard/my-library/books?message=You have successfully paired labels, you can now add books to your library."
        );
      }
    },
    [fetchCurrentUserData, router, supabase, userId]
  );

  const handleSubmit = useCallback(async () => {
    const { currentUserData, currentUserError } = await fetchCurrentUserData();

    if (currentUserError) {
      setStatusText("Error checking existing codes");
      return;
    }

    let existingCodes = currentUserData?.codeSeries || [];

    if (
      existingCodes.some(
        (code: { code: string; codeSeries: string }) =>
          code.code === codeValue || code.codeSeries === codeValue
      )
    ) {
      setStatusText("This code has already been paired.");
      console.error("Attempted to pair a code that has already been paired.");
      return;
    }

    let { data: uniqueCodes, error } = await supabase
      .from("uniqueCodes")
      .select("codeSeries, codeSeriesJSON")
      .eq("codeSeries", codeValue)
      .single();

    if (error || !uniqueCodes) {
      setStatusText("Pairing failed. Double check if you typed it correctly.");
      return;
    }
    if (!error && uniqueCodes) {
      await uploadJsonToSupabase({ filteredCodes: uniqueCodes.codeSeriesJSON });
      setStatusText("Paired labels successfully");
    }
  }, [codeValue, supabase, fetchCurrentUserData, uploadJsonToSupabase]);

  useEffect(() => {
    if (codeValue.length === 6) {
      handleSubmit();
    }
  }, [codeValue, handleSubmit]);

  return (
    <>
      <div className="text-center text-sm pb-6">
        <h1 className="text-3xl pb-4 text-primary">Pair your library labels</h1>
        <p className="min-h-10 flex items-center justify-center max-w-sm text-primary/90">
          {codeValue.length <= 5 ? (
            <>
              Enter the 6 character code from the upper left label on your first
              label sheet.
            </>
          ) : (
            <>{statusText}</>
          )}
        </p>
      </div>
      <InputOTP
        autoFocus
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        maxLength={6}
        value={codeValue}
        onChange={(value) => {
          setCodeValue(value);
        }}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}{" "}
          </InputOTPGroup>
        )}
      />
    </>
  );
}
