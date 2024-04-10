"use client";
import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import { Upload } from "lucide-react";

export default function AvatarUpload({
  staticAvatar,
}: {
  staticAvatar: string | null;
}) {
  const supabase = createClient();
  const { user } = useUser();
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${file.name}`, file);
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(`${file.name}`);
      const { data: imageUrl } = await supabase
        .from("myLibrary")
        .update({ avatar: publicUrl })
        .eq("user_id", user?.id)
        .single();
      if (imageUrl || !error) {
        return router.push(
          "/my-library/settings?message=Avatar updated successfully."
        );
      }
    }
  };
  return (
    <label htmlFor="avatar" className="mx-auto cursor-pointer relative">
      <Image
        className="h-28 w-28 rounded-full object-cover "
        alt="avatar"
        src={
          avatar
            ? URL.createObjectURL(avatar)
            : staticAvatar || "/images/avatar-circle.svg"
        }
        height={128}
        width={128}
      />
      <input
        type="file"
        id="avatar"
        name="avatar"
        className="hidden"
        onChange={handleAvatarChange}
      />
      <div className="absolute rounded-full bg-background border-primary/70 border-2 p-1 right-0 bottom-0 text-primary/70">
        <Upload className="" size={16} />
      </div>
    </label>
  );
}
