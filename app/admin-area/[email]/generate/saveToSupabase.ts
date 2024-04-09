import { createClient } from "@/utils/supabase/client";

export const uploadToSupabase = async ({ codes }: { codes: string[] }) => {
  const firstCode = codes[0]; 
  const codesForInsert = codes.map((code, index) => {
    //  forandre begge 44 tallene til det du ønsker
    const seriesStartIndex = Math.floor(index / 44) * 44;
    const codeSeries = codes[seriesStartIndex];
    return { code, codeSeries };
  });

  const supabase = createClient();

  try {
    // Assuming you have a table 'codesJson' with a 'data' column of type jsonb
    const { error } = await supabase.from("uniqueCodes").insert(
      { codeSeriesJSON: codesForInsert,
      codeSeries: firstCode
      } 
    );

    if (error) throw error;
    console.log('Successfully saved JSON to Supabase.');
  } catch (error) {
    console.error("Error saving JSON to Supabase:", error);
  }
};
