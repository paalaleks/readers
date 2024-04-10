"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SavedAlert from "@/components/SavedAlert";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { revalidateSettingsPath } from "./(sa)/revalidatePage";

export default function Username({
  staticUsername,
  staticUserId,
}: {
  staticUsername: string | undefined;
  staticUserId: string | undefined;
}) {
  const [usernameState, setUsernameState] = useState<string>(
    staticUsername || ""
  );
  const [lastUsername, setLastUsername] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);

  const supabase = createClient();

  const updateUsername = async () => {
    usernameState.trim();
    if (usernameState === staticUsername || usernameState === lastUsername) {
      return;
    }

    const { error, status } = await supabase
      .from("myLibrary")
      .update({ username: usernameState })
      .eq("user_id", staticUserId);

    setLastUsername(usernameState);
    revalidateSettingsPath();
    if (error) {
      setSaved(false);
      console.log(error.message);
    } else if (status === 204) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };

  return (
    <>
      <Label htmlFor="username" className="text-muted-foreground">
        Username:
      </Label>
      <Input
        onBlur={updateUsername}
        onChange={(e) => setUsernameState(e.target.value)}
        value={usernameState || ""}
        id="username"
        name="username"
        className="text-base"
      />
      {saved && <SavedAlert />}
    </>
  );
}
