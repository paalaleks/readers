'use server'

import { revalidatePath } from "next/cache" 
export async function revalidateSettingsPath() {
    revalidatePath("/my-library/settings", "page");
}