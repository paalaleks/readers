"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [data, setData] = useState<{ password: string }>({ password: "" });
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const confirmPasswords = async () => {
    const { data: resetData, error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (resetData) {
      router.push("/");
    }
    if (error) console.log(error);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-8 w-full max-w-sm flex flex-col h-full justify-center flex-1 mb-32 ">
      <h1 className="text-3xl text-center mb-6 text-primary px-4 font-bold">
        Update password
      </h1>

      <div className="animate-in flex flex-col w-full justify-center gap-4">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data?.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-4 top-2 text-foreground cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Eye
              className="absolute right-4 top-2 text-foreground cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <Button onClick={() => confirmPasswords()}>Update password</Button>
      </div>
    </div>
  );
}
