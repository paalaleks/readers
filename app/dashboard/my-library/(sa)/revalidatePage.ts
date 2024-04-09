'use server'

import { revalidatePath } from "next/cache" 
export async function revalidateBooksPath() {
    revalidatePath("/my-library/settings", "page");
}