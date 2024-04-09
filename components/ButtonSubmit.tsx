"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "./ui/button";
import Loader from "./Loader";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function ButtonSubmit({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button
      variant="secondary"
      {...props}
      type="submit"
      aria-disabled={pending}
      ref={undefined}
    >
      {isPending ? (
        <div className="flex gap-4">
          <Loader /> {pendingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
