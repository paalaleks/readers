"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import SavedAlert from "@/components/SavedAlert";

export default function Password() {
  const [passwordState, setPasswordState] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const supabase = createClient();

  const updatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: passwordState,
    });

    if (error) {
      setSaved(false);
      console.log(error.message);
    } else if (data) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto w-full mt-2">
        <Label htmlFor="password" className="text-muted-foreground">
          Password:
        </Label>
        <Input
          onBlur={updatePassword}
          onChange={(e) => setPasswordState(e.target.value)}
          value={passwordState || ""}
          id="password"
          name="password"
          className="text-base mt-1"
          placeholder="Enter new password"
        />
      </div>
      {saved && <SavedAlert />}
    </>
  );
}
