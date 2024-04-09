"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function () {
  return (
    <fieldset className="border rounded-xl border-destructive/70 pt-6 pb-8 mt-12 flex flex-col justify-center relative max-w-md w-full px-4 mx-auto text-center">
      <legend className="bg-background px-2 text-destructive/70 h-0 flex items-center">
        <h3>Delete account</h3>
      </legend>
      <p className="mb-4">Are you sure you want to delete your account?</p>
      <Button variant="destructive">Delete Account</Button>
    </fieldset>
  );
}
