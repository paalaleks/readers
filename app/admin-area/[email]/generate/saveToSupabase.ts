import { createClient } from "@/utils/supabase/client";

export const uploadToSupabase = async ({ codes }: { codes: string[] }) => {
  const codesForInsert = codes.map((code, index) => {
    //  forandre begge 44 tallene til det du ønsker
    const seriesStartIndex = Math.floor(index / 44) * 44;
    const codeSeries = codes[seriesStartIndex];
    return { code, codeSeries };
  });

  const supabase = createClient();
  try {
    const { error } = await supabase.from("uniqueCodes").insert(codesForInsert);

    if (error) throw error;
  } catch (error) {
    console.error("Error saving codes to Supabase:", error);
  }
};
