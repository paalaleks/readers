"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import NavBack from "@/components/NavBack";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AvatarUpload from "@/components/AvatarUpload";

export default function Page() {
  const [username, setUsername] = useState<any>("");

  const { user } = useUser();
  const router = useRouter();

  const addImageAndUsername = async (e: any) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase
      .from("myLibrary")
      .update({ username })
      .eq("user_id", user?.id)
      .single();

    if (error) {
      return router.push(
        "/login/add-image-and-username?message=Could not update avatar, try again here."
      );
    }

    return router.push(
      `/my-library/pair-labels?message=Welcome ${username}. You need to pair labels to start using the library app. Remember also to verify your email account.`
    );
  };

  const handleSkip = () => {
    router.push(
      `/my-library/pair-labels?message=Welcome ${user?.email}. You need to pair labels to start using the library app. Remember also to verify your email account.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-32">
      <nav className="flex flex-row justify-between items-center w-full h-32 px-8 max-w-4xl mx-auto">
        <NavBack />
        <Button onClick={handleSkip} variant="ghost">
          Skip this for now.
        </Button>
      </nav>
      <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 gap-8">
        <h1 className="text-2xl text-center flex-0 px-4 font-bold leading-7">
          Add image and username
        </h1>
        <div className="animate-in flex flex-col w-full justify-center ">
          <div className="flex flex-col gap-4">
            <AvatarUpload staticAvatar={null} />

            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              className="mb-2"
              name="username"
              placeholder="your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <ButtonSubmit className="mb-2" onClick={addImageAndUsername}>
              Create user
            </ButtonSubmit>
          </div>
        </div>
      </div>
    </div>
  );
}
