"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import SavedAlert from "@/components/SavedAlert";

export default function Email({
  staticEmail,
}: {
  staticEmail: string | undefined;
}) {
  const [emailState, setEmailState] = useState<string>(staticEmail || "");
  const [lastEmailState, setLastEmailState] = useState<string>(
    staticEmail || ""
  );
  const [saved, setSaved] = useState<boolean>(false);
  const supabase = createClient();

  const updateEmail = async () => {
    emailState.trim();
    if (emailState === staticEmail || emailState === lastEmailState) {
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      email: emailState,
    });

    if (error) {
      setSaved(false);
      setLastEmailState(emailState);
    } else if (data) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto w-full">
        <Label htmlFor="email" className="text-muted-foreground">
          Email:
        </Label>
        <Input
          onBlur={updateEmail}
          onChange={(e) => setEmailState(e.target.value)}
          value={emailState || ""}
          id="email"
          name="email"
          className="text-base mt-1"
        />
      </div>
      {saved && <SavedAlert />}
    </>
  );
}
