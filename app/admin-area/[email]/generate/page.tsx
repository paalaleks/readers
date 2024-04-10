"use client";

import React, { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import LabelSheet from "./LabelSheets";
import { uploadToSupabase } from "./saveToSupabase";

export default function Page() {
  const [codes, setCodes] = useState<string[]>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  const generateUniqueCode = useCallback(() => {
    const characters =
      "abcdefghijklonopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }, []);

  const generateCodes = useCallback(async () => {
    const numberOfCodes = 88;
    let uniqueCodes = new Set<string>();
    while (uniqueCodes.size < numberOfCodes) {
      uniqueCodes.add(generateUniqueCode());
    }
    const codesArray = Array.from(uniqueCodes);
    setCodes(codesArray);
  }, [generateUniqueCode]);

  const generateQrCode = useCallback(async (url: string) => {
    try {
      return await QRCode.toDataURL(url);
    } catch (error) {
      console.error("Error generating QR code", error);
      return "";
    }
  }, []);

  const generateQrCodesForCurrentCodes = useCallback(async () => {
    const qrCodePromises = codes.map((code) =>
      generateQrCode(`${process.env.NEXT_PUBLIC_QRCODE_URL}/c/${code}`)
    );
    const generatedQrCodes = await Promise.all(qrCodePromises);
    setQrCodes(generatedQrCodes);
  }, [codes, generateQrCode]);

  useEffect(() => {
    generateCodes();
    // Since generateCodes is now memoized and its definition only changes if generateUniqueCode changes,
    // which itself has no dependencies and thus does not change, this effect is effectively equivalent to running only once.
  }, [generateCodes]);

  useEffect(() => {
    if (codes.length > 0) {
      generateQrCodesForCurrentCodes();
      uploadToSupabase({ codes });
    }
    // Here, generateQrCodesForCurrentCodes is correctly included as a dependency,
    // and since it's also memoized, it won't cause unnecessary re-runs of this effect.
  }, [codes, generateQrCodesForCurrentCodes]);

  return <LabelSheet qrCodes={qrCodes} />;
}
