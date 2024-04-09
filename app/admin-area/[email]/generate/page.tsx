"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import LabelSheet from "./LabelSheets";
import { uploadToSupabase } from "./saveToSupabase";

export default function page() {
  const [codes, setCodes] = useState<string[]>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  // Function to generate a single unique code
  const generateUniqueCode = () => {
    const characters =
      "abcdefghijklonopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Function to generate the requested number of unique codes
  const generateCodes = async () => {
    const numberOfCodes = 88;
    let uniqueCodes = new Set<string>();
    while (uniqueCodes.size < numberOfCodes) {
      uniqueCodes.add(generateUniqueCode());
    }
    // array of codes
    const codesArray = Array.from(uniqueCodes);
    setCodes(codesArray);
  };

  // Function to generate a QR code for a given URL
  const generateQrCode = async (url: string) => {
    try {
      return await QRCode.toDataURL(url);
    } catch (error) {
      console.error("Error generating QR code", error);
      return "";
    }
  };
  const generateQrCodesForCurrentCodes = async () => {
    const qrCodePromises = codes.map((code) =>
      generateQrCode(`${process.env.NEXT_PUBLIC_QRCODE_URL}/c/${code}`),
    );
    const generatedQrCodes = await Promise.all(qrCodePromises);
    setQrCodes(generatedQrCodes);
  };

  useEffect(() => {
    if (codes.length > 0) {
      generateQrCodesForCurrentCodes();
      // deactive if you dont want to upload to supabase
      uploadToSupabase({ codes });
    }
  }, [codes]);

  useEffect(() => {
    generateCodes();
  }, []);
  console.log(codes);

  return <LabelSheet qrCodes={qrCodes} />;
}
