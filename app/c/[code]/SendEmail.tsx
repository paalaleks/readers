"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SendEmail({ mailto }: { mailto: string }) {
  useEffect(() => {
    window.location.href = mailto;
  }, []);

  return (
    <div className="nav-content-footer min-h-screen flex flex-col justify-center items-center">
      <p>
        If you are not redirected, please{" "}
        <Link className="text-primary" href={mailto}>
          click here
        </Link>
        .
      </p>
    </div>
  );
}
